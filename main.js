const data = [
  // NTV'den alınan AA sonuclarıdır http://secimdata.ntv.com.tr/secimsonuc/genel
  { Kod: "1", Adi: "Saadet Partisi'ne", Oy: 1257482 },
  { Kod: "2", Adi: "BTP'ye", Oy: 166977 },
  { Kod: "3", Adi: "TKP'ye", Oy: 74649 },
  { Kod: "4", Adi: "Vatan Partisi'ne", Oy: 110107 },
  { Kod: "5", Adi: "BBP'ye", Oy: 191224 },
  { Kod: "7", Adi: "CHP'ye", Oy: 13983928 },
  { Kod: "8", Adi: "AK Parti'ye", Oy: 20584029 },
  { Kod: "9", Adi: "DP'ye", Oy: 334923 },
  { Kod: "10", Adi: "MHP'ye", Oy: 3394477 },
  { Kod: "11", Adi: "İyi Parti'ye", Oy: 3459599 },
  { Kod: "12", Adi: "HDP'ye", Oy: 1970370 },
  { Kod: "13", Adi: "DSP'ye", Oy: 453029 },
  { Kod: "0", Adi: "Diğer Partilere", Oy: 878 },
  { Kod: "999", Adi: "Bağımsıza", Oy: 450045 }
];

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("isim");
  if (param) {
    console.log(param);
    const input = document.getElementById("name");
    input.value = param;
    find();
    input.addEventListener("keyup", function(event) {
      console.log(event);
      if (event.key === "Enter") {
        find();
      }
    });
  }
});
function find() {
  const input = document.getElementById("name");
  const toplamSecmen = data.reduce(
    (partial_sum, a) => parseInt(partial_sum) + parseInt(a.Oy),
    0
  );
  if (input.value.length < 6) {
    // En kısa isim ne olur ki, Ali Ak olsa mesela 6 karakter olur en az diye salladım
    document.getElementById("sonuc").innerHTML =
      "Lütfen gerçek bir ad soyad giriniz";
    return;
  }
  window.history.pushState(
    { title: "" },
    "",
    window.location.host + "?isim=" + input.value
  );

  // yazı'yı hash'leyip sayıya çevirip toplam oy sayısına göre mod'unu alalım
  let code = parseInt(input.value.hashCode() % toplamSecmen);
  let oynalanParti = undefined;
  data.map(parti => {
    if (code > 0) {
      // elimizdeki code değerinden sırayla partilerin aldıkları oyları çıkarıyoruz,
      // negatif sayıya ulaştığımız anda o kişi bu partiye oy vermiş demektir
      // (kaynak: Gluten Free AI Deep Learning Pro )
      code -= parti.Oy;
      if (code <= 0) {
        oynalanParti = parti;
      }
    }
  });
  //alert(input.value + " adli kişi oyunu " + oynalanParti.Adi + " vermiş");
  document.getElementById("sonuc").innerHTML =
    "<b>" +
    input.value +
    "</b> adlı kişi oyunu <b>" +
    oynalanParti.Adi +
    "</b> vermiştir.*";
  return;
}

String.prototype.hashCode = function() {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  if (hash < 0) {
    hash *= -1;
  }
  return hash;
};
