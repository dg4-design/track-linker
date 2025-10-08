function App() {
  const [trackingNumber, setTrackingNumber] = React.useState("");
  const [selectedCarrier, setSelectedCarrier] = React.useState("");
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleTrackingNumberChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleCarrierChange = (event) => {
    setSelectedCarrier(event.target.value);
  };

  const getTrackingLink = (carrier, number) => {
    switch (carrier) {
      case "ヤマト運輸":
        return `https://member.kms.kuronekoyamato.co.jp/parcel/detail?pno=${number}`;
      case "佐川急便":
        return `https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?oku01=${number}`;
      case "日本郵便":
        return `https://trackings.post.japanpost.jp/services/sp/srv/search/direct?locale=ja&reqCodeNo=${number}`;
      case "日本通運":
        return `https://lp-trace.nittsu.co.jp/web/webarpaa702.srv?LANG=JP&officeselect2=&denpyoNo1=${number}`;
      case "西濃運輸":
        return `https://track.seino.co.jp/cgi-bin/gnpquery.pgm?GNPNO1=${number}`;
      default:
        return "";
    }
  };

  const handleCopyButtonClick = () => {
    if (selectedCarrier && trackingNumber) {
      navigator.clipboard.writeText(getTrackingLink(selectedCarrier, trackingNumber));
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 1000);
    }
  };

  return (
    <div className="container">
      <input type="text" placeholder="追跡番号を入力してください" value={trackingNumber} onChange={handleTrackingNumberChange} pattern="[0-9]{10,15}" />
      <div>
        <input type="radio" id="yamato" name="carrier" value="ヤマト運輸" onChange={handleCarrierChange} />
        <label htmlFor="yamato">ヤマト運輸</label>
      </div>
      <div>
        <input type="radio" id="sagawa" name="carrier" value="佐川急便" onChange={handleCarrierChange} />
        <label htmlFor="sagawa">佐川急便</label>
      </div>
      <div>
        <input type="radio" id="japanPost" name="carrier" value="日本郵便" onChange={handleCarrierChange} />
        <label htmlFor="japanPost">日本郵便</label>
      </div>
      <div>
        <input type="radio" id="nittsu" name="carrier" value="日本通運" onChange={handleCarrierChange} />
        <label htmlFor="nittsu">日本通運</label>
      </div>
      <div>
        <input type="radio" id="seino" name="carrier" value="西濃運輸" onChange={handleCarrierChange} />
        <label htmlFor="seino">西濃運輸</label>
      </div>
      <div className="result">
        {selectedCarrier && trackingNumber && (
          <p>
            <a href={getTrackingLink(selectedCarrier, trackingNumber)} target="_blank" rel="noopener noreferrer">
              リンクに遷移
            </a>
            <div className="copy-button-container">
              <button onClick={handleCopyButtonClick}>コピー</button>
              {showTooltip && <div className="tooltip">リンクをコピーしました！</div>}
            </div>
          </p>
        )}
      </div>
    </div>
  );
}

const target = document.querySelector("#app");
const root = ReactDOM.createRoot(target);
root.render(<App />);
