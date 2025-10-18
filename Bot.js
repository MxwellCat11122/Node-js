'use strict'

const readline = require('node:readline')
const { stdin: input, stdout: output }  =  require('node:process')
const dialog = readline.createInterface({ input, output })
const number = random

const startMessage = 'Введите цифру     (1 - Поприветсвует Вас, 2 - Случайное число, 3 - Выход, 4 - Игра Угадай Число):\n'
function startBot () {
    dialog.question( startMessage, function( answer ) {
        switch( answer ) {
            case '1':
                console.log ('Привет !') //Выводит при вводе 1 в консоль Привет !
                startBot()
                break
            case '2':
                console.log(`Случайное Число: ${ Math.floor(Math.random() * 6) + 1}`) //Ввыводит при вводе 2 в консоль случайное число
                startBot()
                break
            case '3':
                console.log('До свидания ! Спасибо За Использование бота') //Ввыводит при вводе 3 прощание с пользователем и завершает программу
                dialog.close()
                break    
            case '4':
                game()
                startBot()
                break
                default:
                console.log('Неверный Ввод ! Пожайлуста, Введите 1,2,3 или 4')
                startBot()
                break
            
        }
    })
}
function random () {
    return Math.floor(Math.random() * 6) + 1
}  
function game() {
    const number = random()

    dialog.question('Угадай число от 1 до 6: ', function( answer ) {
        const userInput = parseInt(answer, 10)
    
        if (userInput === number) {
            console.log('Вы угадали!')
        } else {
            console.log(`К сожалению вы проиграли, правильный ответ был ${number}`)
        }

        startBot()
    })
}



startBot() 