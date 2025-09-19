document.addEventListener('DOMContentLoaded', () => {
    const urunler = document.querySelectorAll('.urun');
    const siparisListesi = document.getElementById('siparis-listesi');

    // Modal (Pop-up) penceresi oluşturma
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3 id="modal-urun-adi"></h3>
            <div class="modal-tabs">
                <button class="tab-btn active" data-tab="adet">Adet</button>
                <button class="tab-btn" data-tab="kilo">Kilo</button>
            </div>
            <div id="adet-tab" class="tab-content active">
                <p>Adet giriniz:</p>
                <input type="number" id="adet-input" min="1" value="1">
            </div>
            <div id="kilo-tab" class="tab-content">
                <p>Kilo giriniz:</p>
                <input type="number" id="kilo-input" min="0.1" step="0.1" value="0.5">
            </div>
            <button class="add-to-cart-btn">Sepete Ekle</button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-btn');
    const tabs = modal.querySelectorAll('.tab-btn');
    const tabContents = modal.querySelectorAll('.tab-content');
    const addToCartBtn = modal.querySelector('.add-to-cart-btn');

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tab.dataset.tab + '-tab').classList.add('active');
        });
    });

    urunler.forEach(urun => {
        urun.addEventListener('click', (e) => {
            const urunId = e.currentTarget.dataset.id;
            const urunAdi = `Ürün ${urunId}`;
            modal.style.display = 'block';
            document.getElementById('modal-urun-adi').innerText = urunAdi;
            addToCartBtn.dataset.urunId = urunId;
        });
    });

    addToCartBtn.addEventListener('click', () => {
        const urunId = addToCartBtn.dataset.urunId;
        const urunAdi = `Ürün ${urunId}`;
        let miktar;
        let birim;

        if (document.querySelector('.tab-btn.active').dataset.tab === 'adet') {
            miktar = document.getElementById('adet-input').value;
            birim = "Adet";
        } else {
            miktar = document.getElementById('kilo-input').value;
            birim = "Kilo";
        }

        if (miktar && miktar > 0) {
            const yeniSiparis = document.createElement('li');
            yeniSiparis.innerHTML = `${urunAdi} - ${miktar} ${birim}`;
            siparisListesi.appendChild(yeniSiparis);
            modal.style.display = 'none';
        } else {
            alert('Lütfen geçerli bir miktar girin.');
        }
    });
});