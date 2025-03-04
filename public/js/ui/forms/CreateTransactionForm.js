/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (err, response) => {
      if (response && response.success) {
        let select = this.element.querySelector(".accounts-select");
        select.innerHTML = response.data.reduce((sumValue, currentValue) => {
          sumValue += `<option value="${currentValue.id}">${currentValue.name}</option>`;
          return sumValue;
        }, '');
      };
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

    Transaction.create(data, (err, resp) => {
      if (resp && resp.success) {
        App.update();       
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();        
      }
    });
  }
}