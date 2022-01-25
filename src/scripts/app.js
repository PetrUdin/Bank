document.addEventListener('DOMContentLoaded', () => {
    const calcInput = document.querySelector('.calc__input');
    const calcInputRange = document.querySelector('.calc__input-range');
    const percentBtnMounth = document.querySelector(".calc__btn-mounth");
    const percentBtnEnd = document.querySelector(".calc__btn-end");
    const periodBtnThree = document.querySelector(".calc__btn-three");
    const periodBtnTwo = document.querySelector(".calc__btn-two");
    const inputRate = document.querySelector('.calc__rate-value');
    const inputIncome = document.querySelector('.calc__income-value');
    const inputSumm = document.querySelector('.calc__summ-value');
    const form = document.querySelector(".application__form");
    const check = document.querySelector(".application__check");
    const checkPerData = document.querySelector('.application__check-span');
    var selector = document.getElementById("tel");
    var im = new Inputmask("+7(\\999) 999-99-99");
    im.mask(selector);
    let isSubmit = false;

    calcInputRange.addEventListener("input", () => {
        calcInput.value = calcInputRange.value;
        calc();
    });
    calcInput.addEventListener("input", () => {
        calcInputRange.value = calcInput.value;
        calc();
    })
    percentBtnMounth.addEventListener("click", () => {
        percentBtnMounth.classList.add("active");
        percentBtnEnd.classList.remove("active");
        calc();
    });
    percentBtnEnd.addEventListener("click", () => {
        percentBtnMounth.classList.remove("active");
        percentBtnEnd.classList.add("active");
        calc();
    });
    periodBtnThree.addEventListener("click", () => {
        periodBtnThree.classList.add("active");
        periodBtnTwo.classList.remove("active");
        calc();
    });
    periodBtnTwo.addEventListener("click", () => {
        periodBtnThree.classList.remove("active");
        periodBtnTwo.classList.add("active");
        calc();
    });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        validate()
        if (isSubmit) {
            let data = {
                name: form.elements.name.value,
                surename: form.elements.surename.value,
                fathername: form.elements.fathername.value,
                birthday: form.elements.birthday.value,
                tel: form.elements.tel.value,
                check: form.elements.accept.checked,
            };
            console.log(data);
            form.reset();
        }
    })

    function validate() {
        for (let elem of form.elements) {
            if (elem.value == "") {
                elem.nextElementSibling.textContent =
                    "Поле необходимо заполнить";
                elem.style.borderColor = "#FF535B";
                isSubmit = false;
            } else {
                elem.nextElementSibling.textContent = "";
                elem.style.borderColor = "#818181";
                isSubmit = true;
            }
            if (isSubmit) {
                if (!check.checked) {
                    checkPerData.style.color = "#FF535B";
                    isSubmit = false;
                } else {
                    checkPerData.style.color = "#000";
                    return isSubmit = true;
                }
            }
        }
    }

    function calcPercent() {
        let percent = 0;
        if (periodBtnTwo.classList.contains("active") && percentBtnMounth.classList.contains("active")) {
            percent = 6.20;
        } else if (periodBtnThree.classList.contains("active") && percentBtnMounth.classList.contains("active")) {
            percent = 6.75;

        } else if (periodBtnTwo.classList.contains("active") && percentBtnEnd.classList.contains("active")) {
            percent = 6.60;
        } else if (periodBtnThree.classList.contains("active") && percentBtnEnd.classList.contains("active")) {
            percent = 7.50;
        }
        return percent;
    };

    function calc() {
        let percent = calcPercent();
        let period = 0;
        if (periodBtnThree.classList.contains("active")) {
            period = 3;
        } else {
            period = 2
        }
        let income = (calcInput.value * percent / 100) * period;
        let sum = +income + +calcInput.value;

        inputRate.innerHTML = `${percent}%`;
        inputIncome.innerHTML = `${income} Руб`;
        inputSumm.innerHTML = `${sum} Руб`;
    }
});