// set cookie
document.cookie = "token=RYUEE3EgdEwsLVZP7mhL; path=/; max-age=86400"; // valid for 1 day

$(document).ready(function () {
    // get token from cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`,
            parts = value.split(`; ${name}=`);

        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    }

    const token = getCookie('token') ?? false;

    if (!token) {
        console.error("توکن یافت نشد!");
        return;
    }

    // Show the spinner before the request starts
    $('#spinner').show();

    //  Error => CORS
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://leadstreamline.com/playground',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function (response) {
            // Hide the spinner once response is received
            $('#spinner').hide();
            if (response) {
                return renderEmployees(response);
            }
            return console.error("داده‌ای برای نمایش وجود ندارد.");
        },
        error: function (xhr, status, error) {
            // Hide the spinner in case of error
            $('#spinner').hide();
            console.error("خطا در ارسال درخواست: ", error);
        }
    });

    function renderEmployees(employees) {
        const container = $('#employee-container'),
            fragment = document.createDocumentFragment();

        employees.forEach(employee => {
            const card = document.createElement('div');
            card.classList.add('col-md-4');

            card.innerHTML = `
                <div class="card employee-card">
                    <div class="card-body">
                        <h5 class="card-title">${employee.name}</h5>
                        <p class="card-text">Department: ${employee.department}</p>
                        <p class="card-text">ID: ${employee.id}</p>
                    </div>
                </div>
            `;

            fragment.appendChild(card); // add card to documentFragment
        });

        container.append(fragment); // add all cards to DOM
    }
});
