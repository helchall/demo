import { useState } from "react";


// Ce que nous faisons ici est plutôt simple au fait, nous initialisons un état isShowing à false et une fonction setIsShowing pour changer sa valeur avec useState de React, ensuite nous définissons une fonction toggle qui permet de changer la valeur de isShowing à true ou false et enfin nous retournons l'état isShowing et la fonction toggle.

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle
  };
};

export default useModal;
