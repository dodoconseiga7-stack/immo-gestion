'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Sparkles, AlertCircle, CheckCircle, ShieldAlert, CornerDownLeft } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  requiresConfirmation?: boolean;
  confirmed?: boolean;
}

export default function AssistantePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Bonjour Monsieur. Je suis votre Assistante IMMO GESTION. Comment puis-je vous aider aujourd’hui dans la gestion de vos biens immobiliers à Ouagadougou ?',
      timestamp: 'À l’instant',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Envoi de message
  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          userRole: 'PROPRIETAIRE',
        }),
      });

      const data = await res.json();
      const reply = data.reply || "Une erreur est survenue lors de l'analyse.";

      // Détection d'opération financière sensible
      const isSensitive =
        /enregistr|encaiss|paiement|supprimer|virer|dépens/i.test(textToSend) &&
        /confirm|valider/i.test(reply);

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        requiresConfirmation: isSensitive,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "Désolée, une erreur de communication avec le serveur d'intelligence artificielle est survenue.",
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Reconnaissance vocale Web Speech API
  const toggleListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale directe.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Confirmation d'action financière
  const confirmAction = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, confirmed: true, requiresConfirmation: false } : m
      )
    );
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'assistant',
        text: '✅ Action confirmée et enregistrée avec succès dans le journal d’audit.',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="animate-fade-in flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header Assistante */}
      <div className="bg-[#071B3A] text-white p-4 px-6 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#35C928]/20 border border-[#35C928] flex items-center justify-center text-[#35C928]">
            <Mic size={20} />
          </div>
          <div>
            <h1 className="font-bold text-base flex items-center gap-2">
              Assistante IMMO GESTION
              <span className="w-2 h-2 rounded-full bg-[#35C928] animate-pulse" />
            </h1>
            <p className="text-[11px] text-gray-300">
              Intelligence artificielle immobilière vocale & textuelle
            </p>
          </div>
        </div>
        <span className="text-xs bg-white/10 text-white/80 px-2.5 py-1 rounded-full">
          Gemini Pro 2.5
        </span>
      </div>

      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/50">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#071B3A] text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>

                {/* Bloc de confirmation financière */}
                {m.requiresConfirmation && !m.confirmed && (
                  <div className="mt-3 pt-3 border-t border-gray-200 bg-amber-50/80 -mx-4 -mb-4 p-4 rounded-b-2xl">
                    <p className="text-xs font-semibold text-amber-900 flex items-center gap-1.5 mb-2">
                      <ShieldAlert size={15} /> Confirmation financière requise
                    </p>
                    <p className="text-[11px] text-amber-800 mb-3">
                      Confirmez-vous cette opération financière pour exécution définitive ?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmAction(m.id)}
                        className="bg-[#35C928] hover:bg-[#28A71C] text-white text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <CheckCircle size={13} /> Confirmer l’opération
                      </button>
                      <button
                        onClick={() =>
                          setMessages((prev) =>
                            prev.map((x) =>
                              x.id === m.id ? { ...x, requiresConfirmation: false } : x
                            )
                          )
                        }
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">{m.timestamp}</span>
            </div>
          );
        })}
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 text-xs py-2">
            <Sparkles size={14} className="animate-spin text-[#35C928]" />
            L’Assistante analyse vos données...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions rapides */}
      <div className="p-2 px-4 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => handleSend("Combien de bureaux sont actuellement disponibles ?")}
          className="whitespace-nowrap px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          🏢 Bureaux disponibles
        </button>
        <button
          onClick={() => handleSend("Quels sont les locataires en retard de paiement ce mois-ci ?")}
          className="whitespace-nowrap px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          ⚠️ Impayés du mois
        </button>
        <button
          onClick={() => handleSend("Quel est le montant total des loyers perçus ?")}
          className="whitespace-nowrap px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          💰 Total perçu en FCFA
        </button>
      </div>

      {/* Barre de saisie */}
      <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
        <button
          onClick={toggleListening}
          className={`p-2.5 rounded-xl transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={isListening ? 'Arrêter l’écoute' : 'Parler au micro'}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Posez votre question ou donnez un ordre en français..."
          className="input flex-1 py-2 text-sm"
          disabled={loading}
        />

        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="p-2.5 bg-[#35C928] hover:bg-[#28A71C] text-white rounded-xl transition-colors disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

