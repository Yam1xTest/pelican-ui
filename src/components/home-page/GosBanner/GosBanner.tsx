import Image from "next/image";

export function GosBanner() {
  return (
    <div id="js-show-iframe-wrapper">
      <div className="pos-banner-fluid bf-2">
        <div className="bf-2__decor">
          <div className="bf-2__logo-wrap">
            <Image
              className="bf-2__logo"
              width={200}
              height={400}
              src="/images/gos-banner/gosuslugi-logo.svg"
              unoptimized
              alt="Госуслуги"
            />
            <div className="bf-2__slogan">Решаем вместе</div>
          </div>
        </div>
        <div className="bf-2__content">
          <div className="bf-2__description">
            <span className="bf-2__text">
              Не убран мусор, яма на дороге, не горит фонарь?
            </span>
            <span className="bf-2__text bf-2__text_small">
              Столкнулись с проблемой&nbsp;— сообщите о ней!
            </span>
          </div>
          <div className="bf-2__btn-wrap">

            <button
              className="button pos-banner-btn_2"
              type="button"
              data-testid="gos-banner-button"
            >
              Сообщить о проблеме
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
