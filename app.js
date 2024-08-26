document.addEventListener('DOMContentLoaded', () => {
  const participantsList = document.getElementById('participantsList');
  const addParticipantBtn = document.getElementById('addParticipantBtn');

  addParticipantBtn.addEventListener('click', () => {
    const participantName = prompt("Enter participant's name:");
    if (participantName) {
      // Create a new list item
      const listItem = document.createElement('li');
      listItem.textContent = participantName;
      
      // Create a "Send Request" button
      const requestButton = document.createElement('button');
      requestButton.textContent = 'Send Request';
      requestButton.classList.add('request-btn');
      requestButton.addEventListener('click', () => {
        alert(`Request sent to ${participantName}`);
        // Implement actual request sending logic here
      });

      // Append the button to the list item
      listItem.appendChild(requestButton);

      // Append the list item to the list
      participantsList.appendChild(listItem);
    }
  });
});
