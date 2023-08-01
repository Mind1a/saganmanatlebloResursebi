rightList.forEach((zone, index) => {
          if(zone.querySelector('p')){
          const text = zone.querySelector('p');
          if(text.textContent === correctRight[index + 1]) {
            text.classList.add('correct');
          }else
          {
            text.classList.add('wrong');
          }
        }
        })