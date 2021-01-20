(function(){
  const container = document.querySelector('.container');
  const form = container.querySelector('.form');
  const button = form.querySelector('.form__add-btn');

  // обработчик клика по кнопке "+" и создания дополнительных текстовых полей
  const onAddBtnClick = () => {
    const textInput = document.createElement('input');
    textInput.classList.add('form__other-text');
    textInput.placeholder = 'Еще текст:';
    textInput.type = 'text';
    textInput.name = 'other-text';

    const deleteBtn = document.createElement('input');
    deleteBtn.classList.add('form__delete-btn');
    deleteBtn.type = 'button';
    deleteBtn.value = 'x';

    const inputWithBtn = document.createElement('div');
    inputWithBtn.classList.add('form__text-and-btn');

    inputWithBtn.append(textInput, deleteBtn);
    
    deleteBtn.addEventListener('click', () => inputWithBtn.remove());

    button.insertAdjacentElement('beforebegin', inputWithBtn);
  }

  button.addEventListener('click', onAddBtnClick);

  // обработчик отправки формы и создания блока
  const onFormSubmit = evt => {
    evt.preventDefault();
    const div = document.createElement('div');
    const data = new FormData(form);
    const width = +data.get('length')
    const height = +data.get('height');
    const color = data.get('color');
    const text = data.get('text');
    const textValues = data.getAll('other-text');

    const createErrorBlock = (errorText) => {
      const mistake = document.createElement('div');
      mistake.classList.add('wrong-values');
      mistake.textContent = errorText;
      container.append(mistake);
      throw new Error(errorText);
    }

    const removeBlock = () => {
      const result = container.querySelector('.result');
      const error = container.querySelector('.wrong-values');

      result ? result.remove() : null;
      error ? error.remove() : null;
    }

    if (width < 50 || width > 1000) {
      removeBlock();
      createErrorBlock('width must be more or equal to 50, and less or equal to 1000');

    } else if (height < 50 || height > 600) {
      removeBlock();
      createErrorBlock('height must be more or equal to 50, and less or equal to 600');

    } else if (color.length < 1) {
      removeBlock();
      createErrorBlock('color value must be more 1');

    } else if (text.length < 1) {
      removeBlock();
      createErrorBlock('text value must be more 1');
    }

    div.append(text);

    textValues.forEach((it) => {
      if (it) {
        const textValue = document.createElement('p');
        textValue.style.margin = '0';
        textValue.textContent = it;
        div.append(textValue);
      } else {
        removeBlock();
        createErrorBlock('optional text must be more 1 symbol');
      }
    });

    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.background = color;
    
    div.classList.add('result');

    removeBlock();

    container.append(div);
  };

  form.addEventListener('submit', onFormSubmit);
})();
