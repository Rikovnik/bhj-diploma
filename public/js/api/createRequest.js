/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	let formData = null;

	let url = options.url;
	if (options.data) {
		if (options.method === 'GET') {
			url += '?' + Object.entries(options.data).map(
				entry => entry.map(encodeURIComponent).join('=')
			).join('&');
		} else {
			formData = new FormData();
			Object.entries(options.data).forEach(V => formData.append(...V));
		}
	}

	xhr.onload = () => {
    let err = null;
    let response = null;

    if (xhr.response?.success) {
      response = xhr.response;
    } else {
      err = xhr.response
    };
    
    options.callback(err, response);
  }

	try {
    xhr.open(options.method, url);
	  xhr.send(formData);
  } catch(e) {
    err = e;
  }
};
