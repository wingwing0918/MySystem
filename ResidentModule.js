// Log Out confirmation 
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', function(e) {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
        e.preventDefault(); // Prevent the default action
    }
});

//DESIGNNN!!!!!!
const navLinks = document.querySelectorAll('nav ul li a');


navLinks.forEach(link => {
    link.addEventListener('click', function() {
    
        navLinks.forEach(navLink => navLink.classList.remove('active'));

  
        this.classList.add('active');
    });
});

// Function to show the selected section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

// Show the default section (Dashboard) on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard'); // Default to showing the Dashboard
    renderUploadedImages(); // Call to render uploaded images on page load
});

// Function to display uploaded images from localStorage
function renderUploadedImages() {
    let imagesArray = JSON.parse(localStorage.getItem('sharedImages')) || [];

    const imageDisplayContainer = document.getElementById('imageDisplayContainer');
    imageDisplayContainer.innerHTML = ''; // Clear the image container

    imagesArray.forEach((item) => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image-description-container');

        const img = document.createElement('img');
        img.src = item.image; // Assuming item.image is the correct image URL
        img.onerror = function() {
            this.src = 'path/to/default/image.png'; // Fallback image
        };

        const description = document.createElement('p');
        description.innerHTML = item.description.replace(/\n/g, '<br>');

        imageDiv.appendChild(img);
        imageDiv.appendChild(description);
        imageDisplayContainer.appendChild(imageDiv);
    });
}

// SUPPPORT
let userId = 'Maniti Allen'; // Unique identifier for this submitter

// Open the floating concern interface
function openConcernBox() {
    document.getElementById('concernInterface').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Close the floating concern interface
function closeConcernBox() {
    document.getElementById('concernInterface').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Submit a new concern
function submitConcern() {
    const concern = document.getElementById('concernText').value;
    if (concern.trim() !== "") {
        let concerns = JSON.parse(localStorage.getItem(`concerns_${userId}`)) || [];
        concerns.push(concern);
        localStorage.setItem(`concerns_${userId}`, JSON.stringify(concerns));

        document.getElementById('concernText').value = '';
        closeConcernBox();
        displayReplies();

        // Show message sent status
        const status = document.getElementById('messageStatus');
        status.textContent = "Message sent successfully";
        status.classList.add('fade-out');
        
        setTimeout(() => {
            status.textContent = '';
            status.classList.remove('fade-out');
        }, 3000);
    }
}

// Function to display replies from localStorage
function displayReplies() {
    const replies = JSON.parse(localStorage.getItem(`replies_${userId}`)) || [];
    const replyBox = document.getElementById('replies');
    replyBox.innerHTML = replies.map((reply, index) => `
        <div class="reply-box">
            <p><strong>Reply regarding your Concern:<br></strong> ${reply}</p> <!-- Added bold text -->
            <button class="delete-button" onclick="deleteReply(${index})">Delete</button>
        </div>
    `).join('');
}

// Function to delete a reply
function deleteReply(index) {
    let replies = JSON.parse(localStorage.getItem(`replies_${userId}`)) || [];
    replies.splice(index, 1); // Remove the reply from the array
    localStorage.setItem(`replies_${userId}`, JSON.stringify(replies)); // Update localStorage
    displayReplies(); // Re-render the replies
}

// Load concerns and replies on page load
window.onload = function() {
    displayReplies();
    renderUploadedImages(); // Ensure uploaded images are rendered on load
};

//VOTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 // Initialize vote counts in local storage if not present
 if (!localStorage.getItem('voteCounts')) {
    const initialVoteCounts = {
        president: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        vp: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        secretary: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        treasurer: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        pro: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        board1: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        board2: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        board3: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        committee: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        grievance: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0},
        audit: {"Candidate A": 0, "Candidate B": 0, "Candidate C": 0, "Candidate D": 0}
    };
    localStorage.setItem('voteCounts', JSON.stringify(initialVoteCounts));
}

function submitVote() {
    const form = document.getElementById('votingForm');
    const formData = new FormData(form);

    // Retrieve the current vote counts
    const voteCounts = JSON.parse(localStorage.getItem('voteCounts'));

    // Increment the votes for each selected candidate
    voteCounts.president[formData.get('president')]++;
    voteCounts.vp[formData.get('vp')]++;
    voteCounts.secretary[formData.get('secretary')]++;
    voteCounts.treasurer[formData.get('treasurer')]++;
    voteCounts.pro[formData.get('pro')]++;
    voteCounts.board1[formData.get('board1')]++;
    voteCounts.board2[formData.get('board2')]++;
    voteCounts.board3[formData.get('board3')]++;
    voteCounts.committee[formData.get('committee')]++;
    voteCounts.grievance[formData.get('grievance')]++;
    voteCounts.audit[formData.get('audit')]++;

    // Store the updated vote counts back in local storage
    localStorage.setItem('voteCounts', JSON.stringify(voteCounts));

    // Hide the voting form
    form.style.display = 'none';

    // Show thank you message
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.style.display = 'block';

}
//Maintenance!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 // MAINTNANCE MESSAGE Simulate maintenance mode check (this would typically come from a backend call)
 const isMaintenance = true; // Set this based on the admin's decision in the backend

 // Show the popup if the system is in maintenance mode
 if (isMaintenance) {
     document.getElementById('maintenance-popup').style.display = 'block';
 }




 // Function to toggle sidebar visibility HAMBURGIRRRRRRRRRRRRRRRRRRRRRRRRR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 function toggleSidebar() {
    const sidebar = document.getElementById('profileSidebar');
    if (sidebar.style.right === '0px') {
        sidebar.style.right = '-250px';
    } else {
        sidebar.style.right = '0px';
        loadProfile(); // Load profile data when sidebar opens
    }
}

function closeSidebar() {
    document.getElementById('profileSidebar').style.right = '-250px';
}

// Function to load profile information from server
function loadProfile() {
    // Use AJAX to fetch profile data
    fetch('fetchProfile.php')
        .then(response => response.json())
        .then(data => {
            // Update sidebar with fetched profile data
            document.getElementById('residentName').textContent = data.name;
            document.getElementById('residentLotNumber').textContent = `Lot Number: ${data.lot_number}`;
            document.getElementById('residentEmail').textContent = `Email: ${data.email}`;
            document.getElementById('profilePic').src = data.profileImage || 'default-profile.png';
        })
        .catch(error => {
            console.error('Error loading profile:', error);
        });
}


// pang payment itoooooooooooooooooooooooooooooooooooooooooooooooooooooo
// Handle Walk-in Appointment
function submitWalkIn() {
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("appointment-time").value;

    // Check if date and time are selected
    if (date && time) {
        console.log("Submitting walk-in appointment:", date, time); // Debugging step

        // Send data to the server (process_walkin.php)
        fetch("process_walkin.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date, time })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Appointment set successfully.");
                loadTransactionHistory(); // Reload the transaction history
            } else {
                alert("Error setting appointment.");
            }
        })
        .catch(error => console.error("Error:", error)); // Handle any errors
    } else {
        alert("Please fill out both date and time.");
    }
}

// Handle Online Payment
function submitOnlinePayment(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    console.log("Online payment function called"); // Debugging step

    const formData = new FormData(document.getElementById("online-payment-form"));

    // Send form data to the server (process_online.php)
    fetch("process_online.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Payment submitted successfully.");
            loadTransactionHistory(); // Reload the transaction history
        } else {
            alert("Error processing payment.");
        }
    })
    .catch(error => console.error("Error:", error)); // Handle any errors
}

// Load Transaction History
function loadTransactionHistory() {
    fetch("get_transactions.php")
    .then(response => response.json())
    .then(transactions => {
        const ledgerBody = document.getElementById("ledger-body");
        ledgerBody.innerHTML = ""; // Clear previous transaction history

        // Loop through each transaction and append it to the table
        transactions.forEach(tr => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${tr.date}</td>
                <td>${tr.transaction_type}</td>
                <td>${tr.lot_number}</td>
                <td>${tr.name}</td>
                <td>${tr.amount}</td>
            `;
            ledgerBody.appendChild(row);
        });
    })
    .catch(error => console.error("Error loading transaction history:", error));
}

// Initialize transaction history on page load
document.addEventListener("DOMContentLoaded", loadTransactionHistory);