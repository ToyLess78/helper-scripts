document.querySelectorAll("[class]").forEach(element => {
  if (typeof element.className === "string") {
    element.className = element.className
      .split(" ")
      .filter(className => !className.includes("XqwWvWI"))
      .join(" ");
  }
});
