const App = () => {
    const result = document.getElementById('results');
    const btnClick = document.querySelector('.buttons');
    const paginationElement = document.getElementById('pagination');

    const state = {
        paginationLength: '',
        paginationInfo: '',
        currTab: '',
        currPage: 1,
        data: {},
    };

    let { paginationLength, paginationInfo, currPage, data } = state;

  
    const setupPagination = () => {
        paginationElement.innerHTML = "";
    
        for (let i = 1; i < paginationLength + 1; i++) {
          let btn = paginationButton(i);
          paginationElement.appendChild(btn);
        }
      };
    const paginationButton = (i) => {
        let button = document.createElement('button');
        button.innerText = i;

        button.addEventListener('click', async (e) => {
            currPage = e.target.innerText;
            const response = await fetch(`https://swapi.dev/api/${currTab}?page=${currPage}`);
            data = await response.json();

            showResult();
        });
        return button;
    };


    const infoBtn = async () => {
        const response = await fetch(`https://swapi.dev/api/${currTab}?page=${currPage}`);
    
        data = await response.json();
    
        paginationLength = Math.ceil(data.count / data.results.length);
        paginationInfo = data.results.length;
        paginationElement.innerHTML = "";
        console.log(data);
    
        setupPagination();
        showResult();
      };

      const showResult = () => {
        output = "";
    
        if (currTab === "people") {
          data.results.forEach((item) => {
            output += `<div class="main">${item.name}</div>`;
          });
        }
    
        if (currTab === "starships") {
          data.results.forEach((item) => {
            output += `<div class="main">${item.name}</div>`;
          });
        }
    
        if (currTab === "planets") {
          data.results.forEach((item) => {
            output += `<div class="main">${item.name}</div>`;
          });
        }
        result.innerHTML = output;
      };
    
    btnClick.addEventListener('click', (e) => {
        currTab = e.target.textContent.trim().toLowerCase();
        infoBtn();
    });
};
document.addEventListener('DOMContentLoaded', App)