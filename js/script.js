// Admin Credentials
const ADMIN = {
    username: "Admin",
    password: "admin"
};

// Sample Travel Packages
const PACKAGES = [
    {
        id: 1,
        name: "Beach Paradise",
        price: 1200,
        destination: "Maldives",
        duration: "7 Days",
        description: "Relax on pristine white sands with crystal-clear waters in your private villa.",
         images: [
            "maldives1.jpg",
            "maldives2.jpg",
            "maldives3.jpg",
            "maldives4.jpg",
            "maldives5.jpg"
        ]
    },
    {
        id: 2,
        name: "Mountain Trek",
        price: 800,
        destination: "Switzerland",
        duration: "5 Days",
        description: "Hike through the Swiss Alps with breathtaking views and cozy mountain lodges.",
         images: [
            "swiss-alps1.jpg",
            "swiss-alps2.jpg",
            "swiss-alps3.jpg",
            "swiss-alps4.jpg",
            "swiss-alps5.jpg"
        ]
    },
    {
        id: 3,
        name: "City Explorer",
        price: 600,
        destination: "Tokyo",
        duration: "4 Days",
        description: "Experience the vibrant culture and cutting-edge technology of Japan's capital.",
        images: [
            "tokyo1.jpg",
            "tokyo2.jpg",
            "tokyo3.jpg",
            "tokyo4.jpg",
            "tokyo5.jpg"
        ]
    },
    {
        id: 4,
        name: "Safari Adventure",
        price: 1500,
        destination: "Kenya",
        duration: "8 Days",
        description: "Witness the Great Migration and stay in luxury safari tents.",
        images: [
            "kenya1.jpg",
            "kenya2.jpg",
            "kenya3.jpg",
            "kenya4.jpg",
            "kenya5.jpg",

        ]
    },
    {
        id: 5,
        name: "European Tour",
        price: 2000,
        destination: "France, Italy, Spain",
        duration: "12 Days",
        description: "Visit three iconic European countries with guided tours of major landmarks.",
        images: [
            "europe1.jpg",
            "europe2.jpg",
            "europe3.jpg",
            "europe4.jpg",
            "europe5.jpg"
        ]
    },
    {
        id: 6,
        name: "Caribbean Cruise",
        price: 1800,
        destination: "Bahamas, Jamaica",
        duration: "10 Days",
        description: "Island-hop aboard a luxury cruise ship with all-inclusive amenities.",
        images: [
            "caribbean1.jpg",
            "caribbean2.jpg",
            "caribbean3.jpg",
            "caribbean4.jpg",
            "caribbean5.jpg"
        ]
    },
    {
        id: 7,
        name: "Northern Lights",
        price: 1300,
        destination: "Iceland",
        duration: "6 Days",
        description: "Chase the aurora borealis and soak in geothermal hot springs.",
        images: [
            "iceland1.jpg",
            "iceland2.jpg",
            "iceland3.jpg",
            "iceland4.jpg",
            "iceland5.jpg"
        ]
    },
    {
        id: 8,
        name: "Cultural India",
        price: 900,
        destination: "Delhi, Agra, Jaipur",
        duration: "7 Days",
        description: "Explore the Golden Triangle with visits to the Taj Mahal and historic forts.",
        images: [
            "india1.jpg",
            "india2.jpg",
            "india3.jpg",
            "india4.jpg",
            "india5.jpg"
        ]
    }
];

// User Bookings (Stored in localStorage)
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// ===== LOGIN FUNCTIONALITY =====
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        if (username === ADMIN.username && password === ADMIN.password) {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("loginError").textContent = "Invalid credentials!";
        }
    });
}

// ===== LOGOUT FUNCTION =====
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}

// ===== CHECK AUTH ON PROTECTED PAGES =====
function checkAuth() {
    const protectedPages = ["dashboard.html", "packages.html", "bookings.html"];
    const currentPage = window.location.pathname.split("/").pop();
    
    if (protectedPages.includes(currentPage)) {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
            window.location.href = "index.html";
        }
    }
}

// ===== LOAD PACKAGES =====
if (document.getElementById("packagesContainer")) {
    const container = document.getElementById("packagesContainer");
    PACKAGES.forEach(pkg => {
        const card = document.createElement("div");
        card.className = "package-card";
        card.innerHTML = `
            <div class="package-image" style="background-image: url('images/${pkg.images[0]}')"></div>
            <div class="package-content">
                <h3>${pkg.name}</h3>
                <p><strong>Destination:</strong> ${pkg.destination}</p>
                <p><strong>Duration:</strong> ${pkg.duration}</p>
                <p><strong>Price:</strong> $${pkg.price}</p>
                <button onclick="viewPackageDetails(${pkg.id})">View Details</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== BOOK A PACKAGE =====
function bookPackage(id) {
    const package = PACKAGES.find(p => p.id === id);
    if (package) {
        bookings.push({
            id: Date.now(),
            packageId: package.id,
            name: package.name,
            price: package.price,
            date: new Date().toLocaleDateString(),
            status: "Confirmed"
        });
        localStorage.setItem("bookings", JSON.stringify(bookings));
        alert(`Booked: ${package.name}`);
    }
}

// ===== LOAD BOOKINGS =====
if (document.getElementById("bookingsTable")) {
    const table = document.getElementById("bookingsTable");
    if (bookings.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No bookings yet!</td></tr>";
    } else {
        bookings.forEach(booking => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.name}</td>
                <td>$${booking.price}</td>
                <td>${booking.status}</td>
            `;
            table.appendChild(row);
        });
    }
}
function viewPackageDetails(packageId) {
    const package = PACKAGES.find(p => p.id === packageId);
    if (package) {
        localStorage.setItem("currentPackage", JSON.stringify(package));
        window.location.href = "package-details.html";
    }
}

function loadPackageDetails() {
    if (window.location.pathname.includes("package-details.html")) {
        const pkg = JSON.parse(localStorage.getItem("currentPackage"));  // renamed from 'package' to 'pkg'
        if (pkg) {
            document.getElementById("packageName").textContent = pkg.name;
            document.getElementById("packageDestination").textContent = pkg.destination;
            document.getElementById("packageDuration").textContent = pkg.duration;
            document.getElementById("packagePrice").textContent = pkg.price;
            document.getElementById("packageDescription").textContent = pkg.description;
            document.getElementById("packageTitle").textContent = pkg.name;

            const gallery = document.getElementById("packageGallery");
            pkg.images.forEach(img => {
                const imgElement = document.createElement("div");
                imgElement.className = "gallery-image";
                imgElement.style.backgroundImage = `url('images/${img}')`;
                gallery.appendChild(imgElement);
            });

            // Add event listeners after all images are appended
            document.querySelectorAll('.gallery-image').forEach((img, index) => {
                img.addEventListener('click', () => {
                    openModal(pkg.images[index]);
                });
            });
        }
    }
}


function bookCurrentPackage() {
    const package = JSON.parse(localStorage.getItem("currentPackage"));
    if (package) {
        bookPackage(package.id);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    loadPackageDetails();
    
    if (document.getElementById("totalBookings")) {
        document.getElementById("totalBookings").textContent = bookings.length;
    }
});
function openModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" src="images/${imageSrc}">
    `;
    document.body.appendChild(modal);
    
    modal.style.display = "block";
    
    modal.querySelector('.close').onclick = function() {
        modal.style.display = "none";
        modal.remove();
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modal.remove();
        }
    }
}