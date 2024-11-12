const form = document.getElementById("userForm");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            clearSpans();
            if (validateForm()) {
                createTable();
            }
        });

        function validateForm() {
            let isValid = true;
            const fields = ["firstname", "lastname", "email"];
            fields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value) {
                    createSpan(input, `${field} is required.`);
                    isValid = false;
                }
            });
            return isValid;
        }

        function createSpan(input, message) {
            const span = document.createElement("span");
            span.className = "error";
            span.textContent = message;
            input.parentNode.insertBefore(span, input.nextSibling);
        }

        function clearSpans() {
            const spans = document.querySelectorAll(".error");
            spans.forEach(span => {
                span.parentNode.removeChild(span);
            });
        }

        function clearForm() {
            form.reset();
            clearSpans();
        }

        function createTable() {
            const table = document.createElement("table");
            const headers = ["Field", "Value"];
            const data = {
                "First Name": document.getElementById("firstname").value,
                "Last Name": document.getElementById("lastname").value,
                "Email": document.getElementById("email").value,
                "Checkbox": document.getElementById("checkbox").checked ? "Checked" : "Unchecked",
                "Radio": document.querySelector('input[name="radio"]:checked') ? document.querySelector('input[name="radio"]:checked').value : "Not selected",
                "Comment": document.getElementById("comment").value,
                "Dropdown": document.getElementById("dropdown").value
            };

            const headerRow = table.insertRow(0);
            headers.forEach((header, index) => {
                const cell = headerRow.insertCell(index);
                cell.textContent = header;
            });

            Object.entries(data).forEach(([field, value], index) => {
                const row = table.insertRow(index + 1);
                const fieldCell = row.insertCell(0);
                const valueCell = row.insertCell(1);
                fieldCell.textContent = field;
                valueCell.textContent = value;
            });

            document.body.appendChild(table);
        }