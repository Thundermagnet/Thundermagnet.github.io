document.querySelectorAll('.game-card[aria-controls]').forEach((card) => {
    const dialog = document.getElementById(card.getAttribute('aria-controls'));

    card.addEventListener('click', () => dialog.showModal());

    // Only dismiss a backdrop click when both ends of the gesture are outside.
    let startedOnBackdrop = false;
    const isOutside = (event) => {
        const bounds = dialog.getBoundingClientRect();
        return event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom;
    };
    dialog.addEventListener('pointerdown', (event) => {
        startedOnBackdrop = event.target === dialog && isOutside(event);
    });
    dialog.addEventListener('click', (event) => {
        if (startedOnBackdrop && event.target === dialog && isOutside(event)) {
            dialog.close();
        }
        startedOnBackdrop = false;
    });
});
