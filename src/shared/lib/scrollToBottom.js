export const scrollToBottom = ({ className }) => {
  const element = document.querySelector(`.${className}`);
  element.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
};
