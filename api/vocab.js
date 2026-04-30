export default async function handler(req, res) {
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSx3MIoGozR-VNCdCJPdUDBfxw__JV5jf_t8PyJklha3nbP8a5DNy5-4DltPabDe3Q8-QYHxplUVN_y/pub?gid=0&single=true&output=csv';

  try {
    const response = await fetch(CSV_URL);
    const csv = await response.text();

    const lines = csv.split('\n').slice(1); // salta intestazione
    const vocabulary = lines
      .map(line => {
        // Supporta sia tab che virgola come separatore
        // Usa indexOf per non spezzare i valori che contengono virgole (es. "Canzoniere, 90")
        const sep = line.includes('\t') ? '\t' : ',';
        const firstSep = line.indexOf(sep);
        if (firstSep === -1) return null;
        const source = line.slice(0, firstSep).replace(/^"|"$/g, '').trim();
        const target = line.slice(firstSep + 1).replace(/^"|"$/g, '').trim().replace(/\r$/, '');
        return { source, target };
      })
      .filter(item => item && item.source && item.target);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(vocabulary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
