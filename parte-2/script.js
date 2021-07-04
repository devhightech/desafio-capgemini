const Modal = {
    open() {
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },

    close() {
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("transactions")) || []
    },
    
    set(transactions) {
        localStorage.setItem("transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },

    totalInvestment() {
        let total, start_day, end_day, amount, diff, days
        Transaction.all.forEach(transaction => {
            start_day = transaction.start_date
            end_day = transaction.end_date
            amount = transaction.investment
            diff = moment(end_day, "DD/MM/YYYY hh:mm:ss").diff(moment(start_day, "DD/MM/YYYY hh:mm:ss"))
            days = moment.duration(diff).asDays()
            total = (days * amount) / 100
            return total
        })
    },
    
    totalViews() {
        return Transaction.totalInvestment() * 30
    },
    
    totalClicks() { 
        return (Transaction.totalViews() * 12) / 100
    },
    
    totalShares() {
        return (Transaction.totalClicks() * 3) / 20
    }
}

const Information = {
    all: Storage.get(),

    add(information) {
        Information.all.push(information)
        App.reload()
    },

    remove(index) {
        Information.all.splice(index, 1)
        App.reload()
    }
}

function createReport() {
    var report = document.getElementById('information').innerHTML;

    var style = "<style>";
    style = style + "ul { list-style-type: none; margin: 0; }";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    var win = window.open('', '', 'height=700, width=700');
    
    win.document.write('<html><head>');
    win.document.write('<title>Relatório</title>');
    win.document.write(style);                          
    win.document.write('</head>');

    win.document.write('<body>');
    win.document.write(report);  
    win.document.write('</body></html>');

    win.document.close(); 	                                         
    win.print();                                                            
}

const Report = {
    informationsReport: document.querySelector('#info-table tbody'),

    addInformation(information, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = Report.innerHTMLInformation(information, index)
        tr.dataset.index = index

        Report.informationsReport.appendChild(tr)
    },

    innerHTMLInformation(information, index) {
        const CSSclass1 = information.investment
        const investment = Utils.formatCurrency(information.investment)

        const html = `
        <td class="ad">${information.ad}</td>
        <td class="client">${information.client}</td>
        <td class="start_date">${information.start_date}</td>
        <td class="end_date">${information.end_date}</td>
        <td class="${CSSclass1}">${investment}</td>
        `
        return html
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
        const html = `
        <td class="ad">${transaction.ad}</td>

        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="remover transação">
        </td>
        `
        return html
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatInvestment(value) {
        value = value * 100
        return Math.round(value)
    },

    formatData(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value    
    }
}

const Form = {
    ad: document.querySelector('input#ad'),
    client: document.querySelector('input#client'),
    start_date: document.querySelector('input#start_date'),
    end_date: document.querySelector('input#end_date'),
    investment: document.querySelector('input#investment'),

    getValues() {
        return {
            ad: Form.ad.value,
            client: Form.client.value,
            start_date: Form.start_date.value,
            end_date: Form.end_date.value,
            investment: Form.investment.value
        }
    },

    validateFields() {
        const {ad, client, start_date, end_date, investment} = Form.getValues()
        if(ad.trim() === "" || client.trim() === "" || start_date.trim() === "" || end_date.trim() === "" || investment.trim() === ""){
            throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues() {
        let {ad, client, start_date, end_date, investment} = Form.getValues()
        investment = Utils.formatInvestment(investment)
        start_date = Utils.formatData(start_date)
        end_date = Utils.formatData(end_date)

        return{
            ad, client, start_date, end_date, investment
        }
    },

    clearFields() {
        Form.ad.value = ""
        Form.client.value = ""
        Form.start_date.value = ""
        Form.end_date.value = ""
        Form.investment.value = ""
    },

    submit(event) {
        event.preventDefault() 

        try {
            Form.validateFields()
            const transaction = Form.formatValues()
            Transaction.add(transaction)
            Form.clearFields()
            Modal.close()
        } catch(error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {
        Transaction.all.forEach(DOM.addTransaction)
        Information.all.forEach(Report.addInformation)
        Storage.set(Transaction.all)        
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()