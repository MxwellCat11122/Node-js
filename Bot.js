'use strict'

const readline = require('node:readline')
const { stdin: input, stdout: output }  =  require('node:process')
const dialog = readline.createInterface({ input, output })

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
                console.log('Досвидания ! Спасибо За Использование бота') //Ввыводит при вводе 3 прощание с пользователем и завершает программу
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
const random = (`Случайное число:${ Math.floor(Math.random() * 6) + 1}`)  
    
    function game() {
        if (random === input) {
            dialog.question( function(answer)  {
                console.log('Ваш ответ')
            } )
            console.log('Вы угадали !')
        } else {
            console.log('К сожелению вы не угадали :(')
        }
    }
startBot()