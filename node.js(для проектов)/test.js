'use strict';

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

function performOperation(num1, operator, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                throw new Error("Ошибка: Делить на ноль нельзя!");
            }
            return num1 / num2;
        default:
            throw new Error(`Неизвестный оператор: ${operator}`);
    }
}

function calculate(currentResult, input, isFirstCalculation) {
    const parts = input.trim().split(/\s+/);

    if (isFirstCalculation && parts.length !== 3) {
        throw new Error("Ошибка ввода: Введите полное выражение (число1 оператор число2), например 5 + 5");
    }
    
    if (!isFirstCalculation && parts.length !== 2) {
        throw new Error("Ошибка ввода: Введите только операцию и число (оператор число2), например: * 2");
    }

    let num1, operator, num2;

    if (isFirstCalculation) {
        num1 = parseFloat(parts[0]);
        operator = parts[1];
        num2 = parseFloat(parts[2]);
    } else {
        num1 = currentResult;
        operator = parts[0];
        num2 = parseFloat(parts[1]);
    }

    if (isNaN(num1) || isNaN(num2)) {
        throw new Error("Ошибка: Операнды должны быть числами.");
    }

    return performOperation(num1, operator, num2);
}

function startCalculator() {
    console.log("------------------------");
    console.log("Добро пожаловать в Калькулятор!");
    console.log("Команды: 'exit' (выход), 'reset' (сброс).");
    console.log("Начало: число1 оператор число2 (например: 10 + 5)");
    console.log("Далее: оператор число2 (например: * 2)");
    console.log("------------------------");

    let result = 0;
    let isFirstCalculation = true;

    const askForInput = () => {
        const prompt = isFirstCalculation
            ? "Введите выражение: "
            : `Текущий результат (${result}) -> Введите операцию: `;

        rl.question(prompt, (input) => {
            const cleanInput = input.trim().toLowerCase();

            if (cleanInput === 'exit') {
                rl.close();
                console.log("Спасибо за использование калькулятора!");
                return;
            }

            if (cleanInput === 'reset') {
                result = 0;
                isFirstCalculation = true;
                console.log("Результат сброшен до 0.");
                askForInput();
                return;
            }

            try {
                const newResult = calculate(result, input, isFirstCalculation);
                
                result = newResult;
                isFirstCalculation = false;
                console.log(`\nРезультат: ${result}`);
            } catch (error) {
                console.error(`\n${error.message}`);
            }

            askForInput();
        });
    };

    askForInput();
}

startCalculator();