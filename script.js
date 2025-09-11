(() => {
      const header = document.getElementById('header');
      const dropdownPanel = document.getElementById('dropdownPanel');
      const menus = document.querySelectorAll('.menu');
      const logoArea = document.getElementById('logoArea');
      const blurOverlay = document.getElementById('blurOverlay');

      const menuLinks = {
        dicas: [ { text: 'Dica 1', href: '#' }, { text: 'Dica 2', href: '#' }, { text: 'Dica 3', href: '#' } ],
        ebooks: [ { text: 'Ebook 1', href: '#' }, { text: 'Ebook 2', href: '#' }, { text: 'Ebook 3', href: '#' } ],
        nutricao: [ { text: 'Calculadora IMC', href: '#' }, { text: 'Dieta balanceada', href: '#' }, { text: 'Vitaminas', href: '#' } ],
        'bem-estar': [ { text: 'Relaxamento', href: '#' }, { text: 'Exercícios', href: '#' }, { text: 'Meditação', href: '#' } ]
      };

      let activeMenu = null;
      let dropdownTimeout;

      function showBlur() {
        blurOverlay.style.display = 'block';
        document.body.classList.add('dropdown-active');
      }

      function hideBlur() {
        blurOverlay.style.display = 'none';
        document.body.classList.remove('dropdown-active');
      }

      function updateDropdown(menuKey) {
        dropdownPanel.innerHTML = '';
        menuLinks[menuKey].forEach((linkObj, i) => {
          const a = document.createElement('a');
          a.href = linkObj.href;
          a.textContent = linkObj.text;
          dropdownPanel.appendChild(a);
          setTimeout(() => a.classList.add('visible'), 100 * i);
        });
      }

      function setActiveMenu(menuKey) {
        menus.forEach(menu => {
          menu.classList.toggle('active', menu.dataset.menu === menuKey);
        });
      }

      function clearActiveMenus() {
        menus.forEach(menu => menu.classList.remove('active'));
      }

      header.addEventListener('mouseenter', () => {
        showBlur();
        if (!activeMenu) {
          activeMenu = 'nutricao';
          updateDropdown(activeMenu);
          setActiveMenu(activeMenu);
        }
        header.classList.add('expanded');
      });

      header.addEventListener('mouseleave', () => {
        dropdownTimeout = setTimeout(() => {
          hideBlur();
          header.classList.remove('expanded');
          dropdownPanel.innerHTML = '';
          activeMenu = null;
          clearActiveMenus();
        }, 300);
      });

      dropdownPanel.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimeout);
      });

      dropdownPanel.addEventListener('mouseleave', () => {
        hideBlur();
        header.classList.remove('expanded');
        dropdownPanel.innerHTML = '';
        activeMenu = null;
        clearActiveMenus();
      });

      logoArea.addEventListener('mouseenter', () => {
        hideBlur();
        header.classList.remove('expanded');
        dropdownPanel.innerHTML = '';
        activeMenu = null;
        clearActiveMenus();
      });

      menus.forEach(menu => {
        menu.addEventListener('mouseenter', () => {
          if (!header.classList.contains('expanded')) {
            header.classList.add('expanded');
          }
          showBlur();
          activeMenu = menu.dataset.menu;
          updateDropdown(activeMenu);
          setActiveMenu(activeMenu);
        });
      });
    })();
  
    // Controle dos passos da calculadora IMC
    const firstDiv = document.querySelector('.first-step');
    const secondDiv = document.querySelector('.second-step');
    const finalDiv = document.querySelector('.final-step');

    function go(currentStep, nextStep) {
      const steps = { 1: firstDiv, 2: secondDiv, 3: finalDiv };
      const current = steps[currentStep];
      const next = steps[nextStep];

      current.classList.remove('step-in');
      current.classList.add('step-out');

      setTimeout(() => {
        current.style.display = 'none';
        current.classList.remove('step-out');

        next.style.display = 'block';
        next.classList.add('step-in');
      }, 500);
    }

    window.onload = () => {
      firstDiv.style.display = 'block';
      firstDiv.style.opacity = 1;
    };

    function validate() {
      const peso = document.getElementById('peso');
      const altura = document.getElementById('altura');
      peso.style.border = 'none';
      altura.style.border = 'none';

      if (!peso.value || !altura.value) {
        if (!peso.value && !altura.value) {
          peso.style.border = '1px solid red';
          altura.style.border = '1px solid red';
        } else if (!peso.value) {
          peso.style.border = '1px solid red';
        } else {
          altura.style.border = '1px solid red';
        }
      } else {
        let pesoVal = parseFloat(peso.value.replace(',', '.'));
        let alturaVal = parseFloat(altura.value.replace(',', '.'));

        if (isNaN(pesoVal) || isNaN(alturaVal)) {
          alert("Insira valores numéricos válidos (ex: 70.5 ou 1.75)");
          return;
        }

        let imc = pesoVal / (alturaVal * alturaVal);
        const result = document.getElementById('resultado');

        let alturaEmMetros = alturaVal;
        if (alturaVal > 10) {
          alturaEmMetros = alturaVal / 100;
        }

        let pesoMin = (18.5 * alturaEmMetros * alturaEmMetros).toFixed(1);
        let pesoMax = (24.9 * alturaEmMetros * alturaEmMetros).toFixed(1);

        let classificacao = "";
        if (imc < 18.5) {
          classificacao = "Magreza";
        } else if (imc < 25) {
          classificacao = "Normal";
        } else if (imc < 30) {
          classificacao = "Sobrepeso"; 
        } else if (imc < 35) {
          classificacao = "Obesidade | Grau: I";
        } else if (imc < 40) {
          classificacao = "Obesidade | Grau: II";
        } else {
          classificacao = "Obesidade grave | Grau: III";
        }

        result.innerHTML = `
          Seu IMC é <strong>${imc.toFixed(1)} kg/m²</strong> <br>
          ${classificacao} <br><br>
          De acordo com a Organização Mundial da Saúde, para sua altura, 
          seu peso recomendado deve estar entre <strong>${pesoMin} kg</strong> e <strong>${pesoMax} kg</strong>.
        `;
        go(2, 3);
      }
    }
      const btnYes = document.getElementById("btn-yes");
      const btnNo = document.getElementById("btn-no");
      const divYes = document.querySelector(".button-yes");
      const divNo = document.querySelector(".other-page");

      

      function toggleDiv(showDiv, hideDiv) {
        hideDiv.classList.remove("show-content");
        showDiv.classList.add("show-content");
      }

      btnYes.addEventListener("click", () => {
        toggleDiv(divYes, divNo);
      });

      btnNo.addEventListener("click", () => {
        toggleDiv(divNo, divYes);
      });

      const hamburger = document.getElementById('hamburger');
const menuLinks = document.getElementById('menuLinks');

hamburger.addEventListener('click', () => {
  menuLinks.classList.toggle('active');
});
