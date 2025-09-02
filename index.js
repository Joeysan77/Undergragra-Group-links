<!-- Put this script at the end of the body (or use <script defer src="index.js">) -->
(function () {
  // simple debounce
  function debounce(fn, wait = 120) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  document.addEventListener('DOMContentLoaded', function () {
    const search = document.getElementById('search');
    const container = document.getElementById('cont');
    const cards = Array.from(document.querySelectorAll('.container'));

    if (!search) {
      console.error('Search input #search not found.');
      return;
    }

    // Save each card's original display (so we don't hardcode "flex")
    cards.forEach(card => {
      const cs = window.getComputedStyle(card);
      // if display is "none" (unlikely), default to "flex"
      card.dataset.origDisplay = cs.display && cs.display !== 'none' ? cs.display : 'flex';
    });

    // show/hide "no results" message
    const NO_ID = 'noResultsMessage';
    function setNoResults(show) {
      const existing = document.getElementById(NO_ID);
      if (show && !existing) {
        const p = document.createElement('p');
        p.id = NO_ID;
        p.textContent = 'No universities found';
        p.style.textAlign = 'center';
        p.style.color = '#888';
        p.style.margin = '16px 0';
        container.appendChild(p);
      } else if (!show && existing) {
        existing.remove();
      }
    }

    function filterCards() {
      const q = search.value.trim().toLowerCase();
      let found = 0;

      cards.forEach(card => {
        const name = card.querySelector('.flexp')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.flexpid')?.textContent.toLowerCase() || '';
        const text = (name + ' ' + desc);
        if (q === '' || text.includes(q)) {
          card.style.display = card.dataset.origDisplay;
          found++;
        } else {
          card.style.display = 'none';
        }
      });

      setNoResults(found === 0);
      // console.log('search', q, 'matches', found);
    }

    // run on input with debounce
    search.addEventListener('input', debounce(filterCards, 80));

    // initial pass (in case page loads with something in the search box)
    filterCards();
  });
})();


function up() {
    header = document.getElementById("header")
    container = document.getElementById("container")
    nav = document.getElementById('navig')
    header.style.top = "0px"
    container.style.paddingTop = "120px"
    navig.style.transform = "rotateX(0deg)"
    x = 1
}

function down() {
    header = document.getElementById("header")
    container = document.getElementById("container")
    nav = document.getElementById('navig')
    header.style.top = "-100px"
    container.style.paddingTop = "70px"
    navig.style.transform = "rotateX(180deg)"
    x = 0
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    
    up()
    
  } else {
    down()
      }
  prevScrollpos = currentScrollPos;
}
x = 1
function nn() {
    if (x == 1) {
        down()
        x = 0
    }
    else if (x == 0) {
        up()
        x = 1
    }
}