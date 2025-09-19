document.addEventListener('DOMContentLoaded', () => {

    // 52 ürünün tüm verileri burada saklanıyor
    const urunVerileri = [];
    for (let i = 1; i <= 52; i++) {
        urunVerileri.push({
            id: i,
            ad: `Ürün ${i}`,
            aciklama: `Bu, ${i}. ürünün kısa açıklamasıdır.`,
            kategori: (i <= 10) ? 'Tatlılar' : // Örnek kategori belirleme
                       (i <= 20) ? 'Tuzlular' :
                       (i <= 30) ? 'Kurabiyeler' :
                       (i <= 40) ? 'Atıştırmalıklar' :
                       'Fit Tarifler'
        });
    }

    const urunListesiContainer = document.getElementById('urun-listesi-container');
    const siparisListesi = document.getElementById('siparis-listesi');
    const modal = document.getElementById('modal');
    const closeBtn = modal.querySelector('.close-btn');
    const tabs = modal.querySelectorAll('.tab-btn');
    const tabContents = modal.querySelectorAll('.tab-content');
    const addToCartBtn = modal.querySelector('.add-to-cart-btn');

    // Ürünleri dinamik olarak ekrana ekleme fonksiyonu
    function urunleriListele() {
        urunVerileri.forEach(urun => {
            const urunElementi = document.createElement('div');
            urunElementi.classList.add('urun');
            urunElementi.setAttribute('data-id', urun.id);

            urunElementi.innerHTML = `
                <img src="images/${urun.id}.jpg" alt="${urun.ad}">
                <div class="bilgi-penceresi">
                    <h3>${urun.ad}</h3>
                    <p>${urun.aciklama}</p>
                </div>
            `;
            urunListesiContainer.appendChild(urunElementi);
        });

        // Ürünlere tıklama olaylarını bağlama
        document.querySelectorAll('.urun').forEach(urun => {
            urun.addEventListener('click', (e) => {
                const urunId = e.currentTarget.dataset.id;
                const secilenUrun = urunVerileri.find(u => u.id == urunId);
                
                document.getElementById('modal-urun-adi').innerText = secilenUrun.ad;
                addToCartBtn.dataset.urunId = urunId;
                modal.style.display = 'block';
            });
        });
    }

    // Site yüklendiğinde ürünleri listele
    urunleriListele();

    // Modal işlemleri
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

    addToCartBtn.addEventListener('click', () => {
        const urunId = addToCartBtn.dataset.urunId;
        const secilenUrun = urunVerileri.find(u => u.id == urunId);
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
            yeniSiparis.innerHTML = `${secilenUrun.ad} - ${miktar} ${birim}`;
            siparisListesi.appendChild(yeniSiparis);
            modal.style.display = 'none';
        } else {
            alert('Lütfen geçerli bir miktar girin.');
        }
    });
});
