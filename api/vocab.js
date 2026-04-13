export default async function handler(req, res) {
  const SCRIPT_URL = 'https://script.google.com/a/macros/digitalrealitylab.it/s/AKfycbzFrIJmmhwvoQMa-nVJvbkszrh8KFt-EIUo6X1W0oOzuJaZkV_D7uZhR3ndscv-PI7Fdg/exec';

  try {
    const response = await fetch(SCRIPT_URL, {
      redirect: 'follow',
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
