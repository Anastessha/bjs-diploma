class profile {
	constructor ({
		username,
		name: {firstName, lastName},
		password
	}) {
		this.username = username;
		this.name = {firstName, lastName};
		this.password = password;
	}
	
	//Добавление нового пользователя
	
	createUser(callback) {
        console.log(`Добавление пользователя ${this.username}`);
        return ApiConnector.createUser({username: this.username, name: this.name, password: this.password}, (err, data) => {
            console.log(`Добавлен пользователь ${this.username}`);
            callback(err, data);
        });
    }
	
	//Авторизация
	
	performLogin(callback) {
        console.log(`Авторизация пользователя ${this.username}`);
        return ApiConnector.performLogin({username: this.username, password: this.password}, (err, data) => {
            console.log(`Авторизован пользователь ${this.username}`);
            callback(err, data);
        });
    }
	
	//Добавление денег в личный кошелек
	
	addMoney({currency, amount}, callback) {
        console.log(`Добавление ${amount} ${currency} в личный кошелек ${this.username}`);
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Добавлено ${currency}${amount} в личный кошелек ${this.username}`);
            callback(err, data);
        });
    }
	
	//Конвертация валют
	
	convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        console.log(`Конвертация ${targetAmount} из ${fromCurrency} в ${targetCurrency}`);
        return ApiConnector.conversion({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
            console.log(`Перконвертировано ${targetAmount} из ${fromCurrency} в ${targetCurrency}`);
            callback(err, data);
        });
    }
	
	//Перевод токенов другому пользователю
	
	transferMoney({to, amount}, callback) {
        console.log(`Перевести ${to} ${amount} в личный кошелек`);
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`${to}, в личный кошелек переведено ${amount}`);
            callback(err, data);
        });
    }
}

	//Получение курса валют
	
function getStocks(callback) {
	console.log('Получение курса валют');
    return ApiConnector.getStocks((err, data) => {
            console.log('Получение курса валют');
            callback(err, data);
    });
}