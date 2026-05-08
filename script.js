document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const MY_PHONE_NUMBER = "96103036672"; // REPLACE WITH YOUR PHONE NUMBER (include country code, no +)
    const cocktailPrices = {
        espresso_martini: 8.50,
        classic_negroni: 9.00,
        old_fashioned: 10.00
    };
    // ---------------------

    let currentLang = 'en';

    const translations = {
        en: {
            title: "Shake It And Drink It",
            subtitle: "Fresh cocktails for your coffee shop",
            unit: "unit",
            shopLabel: "Coffee Shop Name:",
            shopPlaceholder: "Enter your shop name...",
            addressLabel: "Delivery Address:",
            addressPlaceholder: "Enter your address...",
            orderBtn: "Send Order via WhatsApp",
            alertName: "Please enter your coffee shop name.",
            alertAddress: "Please enter your delivery address.",
            alertItems: "Please select at least one cocktail quantity.",
            msgItems: "Items:",
            subtotal_label: "Subtotal",
            totalLabel: "Total",
            espresso_martini: "Espresso Martini",
            classic_negroni: "Classic Negroni",
            old_fashioned: "Old Fashioned"
        },
        ar: {
            title:" خضا و شربا",
            subtitle: "كوكتيلات طازجة لمقهى الخاص بك",
            unit: "وحدة",
            shopLabel: "اسم المقهى:",
            shopPlaceholder: "أدخل اسم المقهى الخاص بك...",
            addressLabel: "عنوان التوصيل:",
            addressPlaceholder: "أدخل عنوانك...",
            orderBtn: "إرسال الطلب عبر واتساب",
            alertName: "يرجى إدخال اسم المقهى الخاص بك.",
            alertAddress: "يرجى إدخال عنوان التوصيل الخاص بك.",
            alertItems: "يرجى اختيار كمية كوكتيل واحدة على الأقل.",
            msgItems: "الأصناف:",
            subtotal_label: "المجموع الفرعي",
            totalLabel: "المجموع الكلي",
            espresso_martini: "إسبريسو مارتيني",
            classic_negroni: "كلاسيك نيغروني",
            old_fashioned: "أولد فاشون"
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
        document.querySelectorAll('.qty').forEach(input => {
            const nameKey = input.getAttribute('data-name');
            const quantity = parseInt(input.value) || 0;
            const price = cocktailPrices[nameKey];
            const subtotal = quantity * price;
            grandTotal += subtotal;

            const subtotalDisplay = document.querySelector(`[data-subtotal="${nameKey}"]`);
            if (subtotalDisplay) subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
        });

        const grandTotalDisplay = document.getElementById('grand-total-display');
        if (grandTotalDisplay) grandTotalDisplay.textContent = `$${grandTotal.toFixed(2)}`;
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

        if (!shopName) {
            showToast(translations[currentLang].alertName);
            shopNameInput.focus();
            return;
        }

        if (!address) {
            showToast(translations[currentLang].alertAddress);
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
                const translatedName = translations[currentLang][nameKey];
                const price = cocktailPrices[nameKey];
                const itemTotal = quantity * price;
                grandTotal += itemTotal;
                
                orderDetails += `- ${translatedName}: ${quantity} x $${price.toFixed(2)} = $${itemTotal.toFixed(2)}\n`;
                hasItems = true;
            }
        });

        if (!hasItems) {
            showToast(translations[currentLang].alertItems);
            return;
        }

        const t = translations[currentLang];
        const message = `*${shopName}*\n\n${t.msgItems}\n${orderDetails}\n*${t.totalLabel}: $${grandTotal.toFixed(2)}*\n\n${t.addressLabel} ${address}`;
        
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