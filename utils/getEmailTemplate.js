export const getEmailHTML = (firstName) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <p>Hey ${firstName},</p>
      
      <p>Big thank you for trying Linkgenie 🫶</p>
      
      <p>Whether you've posted once or a bunch you're part of this from the start, and that means everything to us.</p>
      
      <p>Now… real talk.</p>
      
      <p>We wanna make Linkgenie even better. But we can't read minds (yet 👀), so we need your help.</p>
      
      <p>Got 2 mins? Tell us what's working, what's confusing, or what made you go "ehhh."</p>
      
      <p>👉 <a href="https://docs.google.com/forms/d/e/1FAIpQLSeAlS_tx9POlnn-EFLvhwvrvTDnD05HtUJIwnhett9eTEaRLQ/viewform?usp=dialog" style="color: #007bff; text-decoration: none;">Give your feedback here</a></p>
      
      <p>No pressure but yes, we actually read every response.</p>
      
      <p>Thanks again for being an early user. You're helping shape something dope.</p>
      
      <p>With love + caffeine,<br>
      Fari & Tino<br>
      Co-Founders, Linkgenie<br>
      <a href="https://linkgenie.one" style="color: #007bff; text-decoration: none;">linkgenie.one</a></p>
    </div>
  `;
};