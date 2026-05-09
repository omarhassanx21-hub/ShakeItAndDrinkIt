document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const MY_PHONE_NUMBER = "96103036672"; // REPLACE WITH YOUR PHONE NUMBER (include country code, no +)
    const cocktailPrices = {
        strawberry_s: 150000, strawberry_l: 450000,
        mango_s: 150000, mango_l: 450000,
        cocktail_s: 150000, cocktail_l: 450000,
        banana_milk_s: 150000, banana_milk_l: 450000,
        kiwi_s: 150000, kiwi_l: 450000,
        berry_s: 150000, berry_l: 450000,
        pineapple_s: 150000, pineapple_l: 450000,
        lemonade_s: 150000, lemonade_l: 450000,
        orange_s: 150000, orange_l: 450000,
        watermelon_s: 150000, watermelon_l: 450000,
        passion_fruit_s: 150000, passion_fruit_l: 450000,
        avocado_s: 150000, avocado_l: 450000
    };
    // ---------------------

    let currentLang = 'en';

    const translations = {
        en: {
            title: "Shake It And Drink It",
            subtitle: "Fresh juices for your coffee shop",
            unit: "unit",
            currency: "L.P",
            shopLabel: "Coffee Shop Name:",
            shopPlaceholder: "Enter your shop name...",
            addressLabel: "Delivery Address:",
            addressPlaceholder: "Enter your address...",
            orderBtn: "Send Order via WhatsApp",
            alertName: "Please enter your coffee shop name.",
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
            subtitle: "عصائر طازجة لمقهى الخاص بك",
            unit: "وحدة",
            currency: "L.P",
            shopLabel: "اسم المقهى:",
            shopPlaceholder: "أدخل اسم المقهى الخاص بك...",
            addressLabel: "عنوان التوصيل:",
            addressPlaceholder: "أدخل عنوانك...",
            orderBtn: "إرسال الطلب عبر واتساب",
            alertName: "يرجى إدخال اسم المقهى الخاص بك.",
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
    const shopNameInput = document.getElementById('shopName');
    const addressInput = document.getElementById('address');
    const langBtns = document.querySelectorAll('.lang-btn');

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

    const updateTotals = () => {
        let grandTotal = 0;
        const currency = translations[currentLang].currency;
        
        document.querySelectorAll('.qty').forEach(input => {
            const nameKey = input.getAttribute('data-name');
            const quantity = parseInt(input.value) || 0;
            const price = cocktailPrices[nameKey];
            const subtotal = quantity * price;
            grandTotal += subtotal;

        });

        const grandTotalDisplay = document.getElementById('grand-total-display');
        if (grandTotalDisplay) grandTotalDisplay.textContent = `${grandTotal.toLocaleString()} ${currency}`;
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

    const sendOrder = () => {
        const shopName = shopNameInput.value.trim();
        const address = addressInput.value.trim();
        const t = translations[currentLang];

        if (!shopName) {
            showToast(t.alertName);
            shopNameInput.focus();
            return;
        }

        if (!address) {
            showToast(t.alertAddress);
            addressInput.focus();
            return;
        }

        const items = document.querySelectorAll('.qty');
        let orderDetails = "";
        let grandTotal = 0;
        let hasItems = false;

        items.forEach(item => {
            const quantity = parseInt(item.value);
            if (quantity > 0) {
                const nameKey = item.getAttribute('data-name');
                const translatedName = t[nameKey];
                const price = cocktailPrices[nameKey];
                const itemTotal = quantity * price;
                grandTotal += itemTotal;
                
                orderDetails += `• ${translatedName}\n  ${quantity} x ${price.toLocaleString()} = ${itemTotal.toLocaleString()}\n`;
                hasItems = true;
            }
        });

        if (!hasItems) {
            showToast(t.alertItems);
            return;
        }

        const separator = "--------------------------";
        const message = `*NEW ORDER: ${shopName}*\n${separator}\n*${t.msgItems}*\n${orderDetails}${separator}\n*${t.totalLabel}: ${grandTotal.toLocaleString()} ${t.currency}*\n${separator}\n*${t.addressLabel}* ${address}`;
        
        // Constructing the URL with encoded message
        const whatsappUrl = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        
        // Redirect user to WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    // Quantity Control Logic
    document.querySelectorAll('.quantity-controls').forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const input = control.querySelector('.qty');

        minusBtn.addEventListener('click', () => {
            const val = parseInt(input.value) || 0;
            if (val > 0) input.value = val - 1;
            updateTotals();
        });

        plusBtn.addEventListener('click', () => {
            const val = parseInt(input.value) || 0;
            input.value = val + 1;
            updateTotals();
        });
    });

    updateTotals(); // Initial calculation

    // Attach event listener
    if (orderBtn) {
        orderBtn.addEventListener('click', sendOrder);
    }
});