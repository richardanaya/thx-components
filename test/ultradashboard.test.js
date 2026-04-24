describe('ultradashboard.html', () => {
  it('loads and initializes the main dashboard widgets', async () => {
    const iframe = document.createElement('iframe');
    iframe.src = '/ultradashboard.html';
    iframe.style.width = '1200px';
    iframe.style.height = '800px';
    document.body.append(iframe);

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('ultradashboard.html did not load')), 5000);
      iframe.addEventListener(
        'load',
        () => {
          clearTimeout(timeout);
          resolve();
        },
        { once: true }
      );
    });

    await new Promise(resolve => setTimeout(resolve, 300));

    const doc = iframe.contentDocument;
    if (!doc) throw new Error('Dashboard iframe has no document');

    const line = doc.getElementById('compliance-line');
    const dropdown = doc.getElementById('mode-dropdown');
    const image = doc.getElementById('scanner-image');
    const form = doc.getElementById('control-form');

    if (!doc.querySelector('thx-tab-group')) throw new Error('Dashboard tab group missing');
    if (!line?.data?.series?.length) throw new Error('Line chart data was not initialized');
    if (!dropdown?.items?.length) throw new Error('Dropdown items were not initialized');
    if (!image?.src?.startsWith('data:image/svg+xml'))
      throw new Error('Scanner image was not initialized');

    const formData = new iframe.contentWindow.FormData(form);
    if (formData.get('operator') !== 'THX-1138') {
      throw new Error(`Expected operator form value, got ${formData.get('operator')}`);
    }
  });
});
