import designExpertIcon from "@/assets/design-expert-icon.png";

const FloatingChatButton = () => {
  const handleClick = () => {
    // TODO: Implement chat functionality
    console.log("Chat with design expert clicked");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-background rounded-full px-4 py-2 shadow-strong hover:shadow-glow transition-all duration-300 hover:scale-105 border border-border/50"
    >
      <img
        src={designExpertIcon}
        alt="Design Expert"
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="text-foreground font-medium text-sm pr-2">
        Talk to Human Blinds Expert
      </span>
    </button>
  );
};

export default FloatingChatButton;
