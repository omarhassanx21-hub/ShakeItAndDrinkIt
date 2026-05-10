document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const MY_PHONE_NUMBER = "9613036672"; // Corrected: removed leading zero after country code
    
    // --- FIREBASE SETUP ---
    const firebaseConfig = {
        apiKey: "AIzaSyCW76Q6rfX8mt5aO6QVNKdPOWbpuT-5K6I",
        authDomain: "shake-it-and-drink-it.firebaseapp.com",
        projectId: "shake-it-and-drink-it",
        storageBucket: "shake-it-and-drink-it.firebasestorage.app",
        messagingSenderId: "472657702271",
        appId: "1:472657702271:web:d912c43badf7d2cf81fe4a",
        measurementId: "G-QM6XHXYZFT"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    firebase.analytics();

    let juiceData = [];
    // ---------------------

    let currentLang = 'en';

    const translations = {
        en: {
            title: "Shake It And Drink It",
            subtitle: "Fresh juices delivered to you",
            unit: "unit",
            currency: "L.P",
            shopLabel: "Customer Name:",
            shopPlaceholder: "Enter your name...",
            addressLabel: "Delivery Address:",
            addressPlaceholder: "Enter your address...",
            orderBtn: "Send Order via WhatsApp",
            alertName: "Please enter your name.",
            alertAddress: "Please enter your delivery address.",
            alertItems: "Please select at least one juice quantity.",
            msgItems: "Items:",
            subtotal_label: "Subtotal",
            totalLabel: "Total",
            small_label: "Small 275ml",
            large_label: "Large 1L",
            strawberry: "Strawberry", mango: "Mango", cocktail: "Cocktail",
            banana_milk: "Banana & Milk", kiwi: "Kiwi", berry: "Berry",
            pineapple: "Pineapple", lemonade: "Lemonade", orange: "Orange",
            watermelon: "Watermelon", passion_fruit: "Passion Fruit", avocado: "Avocado",
            strawberry_s: "Strawberry (Small 275ml)", strawberry_l: "Strawberry (Large 1L)",
            mango_s: "Mango (Small 275ml)", mango_l: "Mango (Large 1L)",
            cocktail_s: "Cocktail (Small 275ml)", cocktail_l: "Cocktail (Large 1L)",
            banana_milk_s: "Banana & Milk (Small 275ml)", banana_milk_l: "Banana & Milk (Large 1L)",
            kiwi_s: "Kiwi (Small 275ml)", kiwi_l: "Kiwi (Large 1L)",
            berry_s: "Berry (Small 275ml)", berry_l: "Berry (Large 1L)",
            pineapple_s: "Pineapple (Small 275ml)", pineapple_l: "Pineapple (Large 1L)",
            lemonade_s: "Lemonade (Small 275ml)", lemonade_l: "Lemonade (Large 1L)",
            orange_s: "Orange (Small 275ml)", orange_l: "Orange (Large 1L)",
            watermelon_s: "Watermelon (Small 275ml)", watermelon_l: "Watermelon (Large 1L)",
            passion_fruit_s: "Passion Fruit (Small 275ml)", passion_fruit_l: "Passion Fruit (Large 1L)",
            avocado_s: "Avocado (Small 275ml)", avocado_l: "Avocado (Large 1L)"
        },
        ar: {
            title: "خضا و شربا",
            subtitle: "عصائر طازجة تصلكم أينما كنتم",
            unit: "وحدة",
            currency: "L.P",
            shopLabel: "اسم العميل:",
            shopPlaceholder: "أدخل اسمك...",
            addressLabel: "عنوان التوصيل:",
            addressPlaceholder: "أدخل عنوانك...",
            orderBtn: "إرسال الطلب عبر واتساب",
            alertName: "يرجى إدخال اسمك.",
            alertAddress: "يرجى إدخال عنوان التوصيل الخاص بك.",
            alertItems: "يرجى اختيار كمية عصير واحدة على الأقل.",
            msgItems: "الأصناف:",
            subtotal_label: "المجموع الفرعي",
            totalLabel: "المجموع الكلي",
            small_label: "صغير 275 مل",
            large_label: "كبير 1 ليتر",
            strawberry: "فريز", mango: "منغا", cocktail: "كوكتيل",
            banana_milk: "حليب و موز", kiwi: "كيوي", berry: "توت",
            pineapple: "اناناس", lemonade: "ليموناضة", orange: "برتقال",
            watermelon: "بطيخ", passion_fruit: "باشن فروت", avocado: "افوكا",
            strawberry_s: "فريز (صغير 275 مل)", strawberry_l: "فريز (كبير 1 ليتر)",
            mango_s: "منغا (صغير 275 مل)", mango_l: "منغا (كبير 1 ليتر)",
            cocktail_s: "كوكتيل (صغير 275 مل)", cocktail_l: "كوكتيل (كبير 1 ليتر)",
            banana_milk_s: "حليب و موز (صغير 275 مل)", banana_milk_l: "حليب و موز (كبير 1 ليتر)",
            kiwi_s: "كيوي (صغير 275 مل)", kiwi_l: "كيوي (كبير 1 ليتر)",
            berry_s: "توت (صغير 275 مل)", berry_l: "توت (كبير 1 ليتر)",
            pineapple_s: "اناناس (صغير 275 مل)", pineapple_l: "اناناس (كبير 1 ليتر)",
            lemonade_s: "ليموناضة (صغير 275 مل)", lemonade_l: "ليموناضة (كبير 1 ليتر)",
            orange_s: "برتقال (صغير 275 مل)", orange_l: "برتقال (كبير 1 ليتر)",
            watermelon_s: "بطيخ (صغير 275 مل)", watermelon_l: "بطيخ (كبير 1 ليتر)",
            passion_fruit_s: "باشن فروت (صغير 275 مل)", passion_fruit_l: "باشن فروت (كبير 1 ليتر)",
            avocado_s: "افوكا (صغير 275 مل)", avocado_l: "افوكا (كبير 1 ليتر)"
        }
    };

    const orderBtn = document.getElementById('whatsapp-btn');
    const clientNameInput = document.getElementById('clientName');
    const addressInput = document.getElementById('address');
    const langBtns = document.querySelectorAll('.lang-btn');
    const grandTotalDisplay = document.getElementById('grand-total-display');

    const switchLanguage = (lang) => {
        currentLang = lang;
        document.body.classList.toggle('rtl', lang === 'ar');
        
        // Update Text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = translations[lang][key];
        });

        // Update Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = translations[lang][key];
        });

        // Update Active Button UI
        langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    };

    const fetchJuicesFromFirestore = async () => {
        try {
            const snapshot = await db.collection('juices').get();
            juiceData = snapshot.docs.map(doc => doc.data());
            renderMenu();
        } catch (error) {
            console.error("Firestore Error:", error.code, error.message);
            showToast("Failed to load menu: " + error.message);
        }
    };

    const renderMenu = () => {
        const menuContainer = document.getElementById('menu');
        if (!menuContainer) return;

        // Capture current quantities to persist them through language switch or re-renders
        const currentQuantities = {};
        document.querySelectorAll('.qty').forEach(input => {
            currentQuantities[input.getAttribute('data-name')] = input.value;
        });

        menuContainer.innerHTML = '';

        juiceData.forEach(item => {
            // Skip rendering if the item is marked as unavailable
            if (item.available === false) return;

            const card = document.createElement('div');
            card.className = 'juice-card';
            
            const flavorTitle = currentLang === 'ar' ? item.ar : item.en;

            card.innerHTML = `
                <h2 class="flavor-title"></h2>
                <div class="size-options">
                    <div class="size-row">
                        <div class="size-info"><span>${translations[currentLang].small_label}</span><span class="price-tag">${(item.price_s || 0).toLocaleString()} L.P</span></div>
                        <div class="quantity-controls">
                            <button class="qty-btn minus" type="button">−</button>
                            <input type="number" class="qty" data-name="${item.id}_s" data-price="${item.price_s}" min="0" value="${currentQuantities[item.id + '_s'] || 0}" readonly>
                            <button class="qty-btn plus" type="button">+</button>
                        </div>
                    </div>
                    <div class="size-row">
                        <div class="size-info"><span>${translations[currentLang].large_label}</span><span class="price-tag">${(item.price_l || 0).toLocaleString()} L.P</span></div>
                        <div class="quantity-controls">
                            <button class="qty-btn minus" type="button">−</button>
                            <input type="number" class="qty" data-name="${item.id}_l" data-price="${item.price_l}" min="0" value="${currentQuantities[item.id + '_l'] || 0}" readonly>
                            <button class="qty-btn plus" type="button">+</button>
                        </div>
                    </div>
                </div>
            `;

            // Set flavor title via textContent for XSS protection
            card.querySelector('.flavor-title').textContent = flavorTitle;
            menuContainer.appendChild(card);
        });

        // Re-attach listeners for plus/minus buttons
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.onclick = (e) => {
                const input = e.target.parentElement.querySelector('.qty');
                let val = parseInt(input.value) || 0;
                input.value = e.target.classList.contains('plus') ? val + 1 : Math.max(0, val - 1);
                updateTotals();
            };
        });

        // Ensure the total is synchronized after rendering
        updateTotals();
    };

    const updateTotals = () => {
        let grandTotal = 0;
        const currency = translations[currentLang].currency;
        
        document.querySelectorAll('.qty').forEach(input => {
            const quantity = parseInt(input.value) || 0;
            const price = parseInt(input.getAttribute('data-price')) || 0;
            const subtotal = quantity * price;
            grandTotal += subtotal;
        });

        if (grandTotalDisplay) grandTotalDisplay.textContent = `${grandTotal.toLocaleString()} ${currency}`;
    };

    const resetOrderForm = () => {
        if (clientNameInput) clientNameInput.value = '';
        if (addressInput) addressInput.value = '';
        document.querySelectorAll('.qty').forEach(input => {
            input.value = 0;
        });
        updateTotals();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showToast = (message) => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    const sendOrder = async () => {
        const clientName = clientNameInput.value.trim();
        const address = addressInput.value.trim();
        const t = translations[currentLang];

        if (!clientName) {
            showToast(t.alertName);
            clientNameInput.focus();
            return;
        }

        if (!address) {
            showToast(t.alertAddress);
            addressInput.focus();
            return;
        }

        const items = document.querySelectorAll('.qty');
        let orderDetails = "";
        let dbItems = [];
        let grandTotal = 0;
        let hasItems = false;

        items.forEach(item => {
            const quantity = parseInt(item.value);
            if (quantity > 0) {
                const nameKey = item.getAttribute('data-name'); // e.g., strawberry_s
                const isSmall = nameKey.endsWith('_s');
                const baseId = nameKey.replace(/_[sl]$/, '');
                const itemData = juiceData.find(j => j.id === baseId);
                
                if (!itemData) return; // Skip if data is missing

                const price = parseInt(item.getAttribute('data-price')) || 0;
                const translatedName = `${currentLang === 'ar' ? itemData.ar : itemData.en} (${t[isSmall ? 'small_label' : 'large_label']})`;
                const itemTotal = quantity * price;
                grandTotal += itemTotal;
                
                orderDetails += `• ${translatedName}\n  ${quantity} x ${price.toLocaleString()} = ${itemTotal.toLocaleString()}\n`;
                
                dbItems.push({
                    id: nameKey, // Uses size-specific ID (e.g. strawberry_s) for accurate analytics
                    name: translatedName,
                    quantity: quantity,
                    price: price
                });
                hasItems = true;
            }
        });

        if (!hasItems) {
            showToast(t.alertItems);
            return;
        }

        try {
            // 1. Save to Firestore for Admin History
            await db.collection('orders').add({
                clientName: clientName,
                address: address,
                items: dbItems,
                total: grandTotal,
                currency: t.currency,
                status: 'pending',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // 2. Construct WhatsApp Message
            const separator = "--------------------------";
            const message = `*NEW ORDER: ${clientName}*\n${separator}\n*${t.msgItems}*\n${orderDetails}${separator}\n*${t.totalLabel}: ${grandTotal.toLocaleString()} ${t.currency}*\n${separator}\n*${t.addressLabel}* ${address}`;

            // 3. Constructing the URL with encoded message
            const whatsappUrl = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

            // 4. Redirect user to WhatsApp
            window.open(whatsappUrl, '_blank');

            // 5. Reset the form to prevent mistakes
            resetOrderForm();

        } catch (error) {
            console.error("Error saving order:", error);
            showToast("Failed to place order. Please try again.");
        }
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
            renderMenu();
        });
    });

    fetchJuicesFromFirestore();
    if (orderBtn) orderBtn.addEventListener('click', sendOrder);
});