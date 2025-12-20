import { useState } from "react";
import { X } from "lucide-react";
import designExpertIcon from "@/assets/design-expert-icon.png";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-background rounded-full p-2 shadow-strong hover:shadow-glow transition-all duration-300 hover:scale-105 border border-border/50"
      >
        <img
          src={designExpertIcon}
          alt="Talk to Human Blinds Expert"
          className="w-12 h-12 rounded-full object-cover"
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-background rounded-xl shadow-strong border border-border/50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Talk to Human Blinds Expert</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          {/* Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-muted-foreground text-sm text-center mt-8">
              Start a conversation with our blinds expert!
            </p>
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
