
function calc() {
  const curDed = parseFloat(document.getElementById('currentDeductible').value) || 0;
  const newDed = parseFloat(document.getElementById('newDeductible').value) || 0;
  const annualSave = parseFloat(document.getElementById('premiumSavings').value) || 0;

  const risk = Math.max(0, newDed - curDed);
  const monthlySave = annualSave / 12;

  let months = monthlySave > 0 ? (risk / monthlySave) : 0;
  let years = (months / 12).toFixed(1);

  const fiveYrSaveNoClaim = annualSave * 5;
  const fiveYrNetClaim = fiveYrSaveNoClaim - risk;

  document.getElementById('breakevenMonths').innerText = months > 0 ? `${months.toFixed(1)} mo` : 'N/A';
  document.getElementById('extraRisk').innerText = '$' + Math.round(risk).toLocaleString();
  document.getElementById('fiveYearSave').innerText = '+$' + Math.round(fiveYrSaveNoClaim).toLocaleString();
  document.getElementById('fiveYearClaim').innerText = (fiveYrNetClaim >= 0 ? '+$' : '-$') + Math.abs(Math.round(fiveYrNetClaim)).toLocaleString();

  let verdict = '';
  if (months <= 36) {
    verdict = `<strong>Recommendation: RAISE DEDUCTIBLE.</strong> You recoup the extra $${risk} in just <strong>${months.toFixed(1)} months</strong> (${years} yrs). The average US driver files a collision claim only once every 10-12 years. If you have $${newDed} in an emergency fund, raising your deductible is a high-probability financial win.`;
  } else {
    verdict = `<strong>Recommendation: KEEP LOWER DEDUCTIBLE.</strong> It takes <strong>${years} years</strong> of accident-free driving to recoup the $${risk} risk. The $${annualSave}/yr savings does not adequately compensate for the increased out-of-pocket vulnerability.`;
  }
  document.getElementById('decisionCard').innerHTML = verdict;
}

['currentDeductible', 'newDeductible', 'premiumSavings'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    if (document.getElementById(id + 'Range')) {
      document.getElementById(id + 'Range').value = document.getElementById(id).value;
    }
    calc();
  });
});

document.getElementById('premiumSavingsRange').addEventListener('input', (e) => {
  document.getElementById('premiumSavings').value = e.target.value;
  calc();
});

calc();
