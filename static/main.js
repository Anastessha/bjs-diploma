'use strict'

class profile {
	constructor ({
		username,
		name: {firstName, lastName},
		password,
	}) {
		this.username = username;
		this.name = {firstName, lastName};
		this.password = password;
	}
	
	//Добавление нового пользователя	
	createUser(callback) {
        return ApiConnector.createUser({username: this.username, name: this.name, password: this.password}, (err, data) => {
            console.log(`Добавление нового пользователя ${this.username}`);
            callback(err, data);
        });
    }
    	
	//Авторизация	
	performLogin(callback) {
        return ApiConnector.performLogin({username: this.username, password: this.password}, (err, data) => {
            console.log(`Авторизация пользователя ${this.username}`);
            callback(err, data);
        });
    }
	
	//Добавление денег в личный кошелек	
	addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney({currency, amount}, (err, data) => {
            console.log(`Добавление ${currency}${amount} в личный кошелек ${this.username}`);
            callback(err, data);
        });
    }
    
	//Конвертация валют	
	convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
            console.log(`Конвертация ${fromCurrency} в ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    }
	
	//Перевод токенов другому пользователю	
	transferMoney({to, amount}, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Перевод ${amount} Неткоинов в личный кошелек ${to}`);
            callback(err, data);
        });
    }
}

//Получение курса валют	
function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
            console.log('Получение курса валют');
            callback(err, data);
    })
}

function main() { 
    let ratio;  
    getStocks((err, data) => {
        if (err) {
            console.log(`Не удалось получить курсы валют`);
        }
        ratio = data[data.length - 1].USD_NETCOIN;
    });
    
    const bonnie = new profile({
        username: 'Бонни',
        name: {firstName: 'Bonnie', lastName: 'Parker'},
        password: '123654',
    });
    const clyde = new profile({
        username: 'Клайд',
        name: {firstName: 'Clyde', lastName: 'Barrow'},
        password: '456321',
    });
    
    // создаем пользователя  
    bonnie.createUser((err, data) => {
        if (err) {
                console.error(`Не удалось создать пользователя ${this.username}`);
        } else {
                console.log(`Добавлен новый пользователь`);        
            
    // авторизуем пользователя
        bonnie.performLogin((err, data) => {
             if (err) {
                  console.error(`Не удалось авторизовать пользователя`);
             } else {
                  console.log(`Пользователь авторизован`);
    
     //добавляем пользователю денег
             let amount = 1000;
             bonnie.addMoney({currency: 'USD', amount: amount}, (err, data) => {
                 if (err) {
                     console.error(`Не удалось добавить денег пользователю`);
                 } else {
                     console.log(`Пользователю добавлено ${amount} USD`);
                      
    // конвертируем валюту в неткоины
                 let targetAmount = amount * ratio;
                 bonnie.convertMoney({fromCurrency: 'USD', targetCurrency: 'NETCOIN', targetAmount: targetAmount}, (err, data) => {
                    if (err) {
                        console.error(`Ошибка конвертации`);
                    } else {
                        console.log(`Конвертация NETCOIN`);
                    
     // создаем второго пользователя
                    clyde.createUser((err, data) => {
                        if (err) {
                            console.error(`Не удалось создать пользователя`);
                        } else {
                            console.log(`Добавлен новый пользователь`);
     
     // переводим второму пользоваелю деньги
                        bonnie.transferMoney({to: clyde.username, amount: targetAmount}, (err, data) => {
                            if (err) {
                                console.log(`Ошибка перевода`);
                            } else {
                                console.log(`Пользователь получил ${targetAmount} Неткоинов`);
                            }
                        });
                        }
                    });
                    }
                });
                }
            });
            }
        });
        }
    });
    }

main();