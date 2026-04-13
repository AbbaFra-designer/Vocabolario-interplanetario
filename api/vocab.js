export default async function handler(req, res) {
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSx3MIoGozR-VNCdCJPdUDBfxw__JV5jf_t8PyJklha3nbP8a5DNy5-4DltPabDe3Q8-QYHxplUVN_y/pub?gid=0&single=true&output=csv';

  try {
    const response = await fetch(CSV_URL);
    const csv = await response.text();

    const lines = csv.split('\n').slice(1); // salta intestazione
    const vocabulary = lines
      .map(line => {
        const parts = line.split(',');
        return {
          source: parts[0]?.replace(/^"|"$/g, '').trim(),
          target: parts[1]?.replace(/^"|"$/g, '').trim()
        };
      })
      .filter(item => item.source && item.target);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(vocabulary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
