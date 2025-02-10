// set cookie
document.cookie = "token=RYUEE3EgdEwsLVZP7mhL; path=/; max-age=86400"; // valid for 1 day

$(document).ready(function () {
    // get tocken from cookie
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

    //  Error => CORS
    // $.ajax({
    //     url: 'https://leadstreamline.com/playground',
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${token}` 
    //     },
    //     success: function (response) {
    //         if (response && response.data) {
    //             renderEmployees(response.data);
    //         } else {
    //             console.error("داده‌ای برای نمایش وجود ندارد.");
    //         }
    //     },
    //     error: function (xhr, status, error) {
    //         console.error("خطا در ارسال درخواست: ", error);
    //     }
    // });

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
        success: (response) => {
            if (response) {
                return renderEmployees(response);
            }
            return console.error("داده‌ای برای نمایش وجود ندارد.");

        },
        error: (error) => {
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
                        <p class="card-text">Website: ${employee.website}</p>
                        <p class="card-text">Email: ${employee.email}</p>
                    </div>
                </div>
            `;

            fragment.appendChild(card); // add cart to documentFragment
        });

        container.append(fragment); // add all carts to dom
    }

});
