const getHeadphoneIcon = ({ isTagging }) => {
  return `
<svg
    class="default-marker-icon icon-sm"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M1.67188 10.1086C1.67188 5.44911 5.40282 1.67188 10.0052 1.67188C14.6075 1.67188 18.3385 5.44911 18.3385 10.1086L18.3385 14.4781C18.3387 15.1588 18.3389 15.6257 18.2192 16.0356C17.9852 16.837 17.4257 17.5 16.6802 17.859C16.299 18.0426 15.8435 18.1152 15.1792 18.2212L15.0709 18.2385C14.8347 18.2762 14.6329 18.3085 14.4654 18.3251C14.2912 18.3425 14.1134 18.3478 13.9317 18.3115C13.3337 18.1923 12.8405 17.7657 12.6309 17.1862C12.5672 17.0101 12.5447 16.8316 12.5344 16.6546C12.5245 16.4846 12.5245 16.2777 12.5245 16.0357L12.5245 12.5587C12.524 12.2041 12.5237 11.899 12.6048 11.6377C12.7904 11.0399 13.275 10.5865 13.8783 10.4462C14.1419 10.3849 14.4423 10.4093 14.7914 10.4376L14.8691 10.4439L14.9607 10.4512C15.6137 10.5031 16.0606 10.5387 16.4399 10.6807C16.7064 10.7805 16.9537 10.918 17.1757 11.0866V10.1086C17.1757 6.09927 13.9653 2.84909 10.0052 2.84909C6.045 2.84909 2.83466 6.09927 2.83466 10.1086V11.0866C3.05667 10.918 3.3039 10.7805 3.57045 10.6807C3.94975 10.5387 4.39658 10.5031 5.04967 10.4512L5.14119 10.4439L5.21889 10.4376C5.568 10.4093 5.86839 10.3849 6.13207 10.4462C6.73531 10.5865 7.21993 11.0399 7.40553 11.6377C7.48666 11.899 7.48629 12.2041 7.48586 12.5587L7.4858 16.0356C7.4858 16.2777 7.48581 16.4846 7.47593 16.6546C7.46566 16.8316 7.44313 17.0101 7.37942 17.1862C7.16982 17.7657 6.67666 18.1923 6.07864 18.3115C5.89688 18.3478 5.71917 18.3425 5.54494 18.3251C5.37747 18.3085 5.17562 18.2762 4.93939 18.2385L4.83109 18.2212C4.16686 18.1152 3.71135 18.0426 3.33013 17.859C2.58466 17.5 2.02511 16.837 1.79111 16.0356C1.69243 15.6976 1.67524 15.3209 1.67238 14.8174L1.67188 14.6555V10.1086Z"
      fill=${isTagging ? '#FEFEFE' : '#767676'}
    />
  </svg>    
`;
};

export const userMarkerTemplate = () => {
  const mobileContentArray = `
    <div class="user-marker-container">
      <span class="user-marker " />
    </div>
      `;
  return mobileContentArray;
};

export const selectedContentMarkerTemplate = ({ imageUrl }) => {
  const mobileContentArray = `
<div class="selected-content-marker-container">
          <img
            class="selected-content-marker-container-image"
            src=${imageUrl}
            alt=""
          />
          <svg
            width="52"
            height="58"
            viewBox="0 0 52 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_156_10045)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17 3C10.3726 3 5 8.37258 5 15V33C5 39.6274 10.3726 45 17 45L20.8038 45L23.4019 49.5C24.5566 51.5 27.4434 51.5 28.5981 49.5L31.1962 45H35C41.6274 45 47 39.6274 47 33V15C47 8.37258 41.6274 3 35 3H17Z"
                fill="#10181F"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_156_10045"
                x="0"
                y="0"
                width="52"
                height="58"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.462745 0 0 0 0 0.462745 0 0 0 0 0.47451 0 0 0 0.3 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_156_10045"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_156_10045"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
  `;
  return mobileContentArray;
};

export const defaultContentMarkerTemplate = ({ contentType, isTagging }) => {
  const marker = `
<div class="default-marker-container">
  ${contentType === 'docent' && getHeadphoneIcon({ isTagging })}
  <svg
    width="38"
    height="42"
    viewBox="0 0 38 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_156_9984)">
      <mask id="path-1-inside-1_156_9984" fill="white">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13 3C8.58172 3 5 6.58172 5 11V23C5 27.4183 8.58172 31 13 31H15.5359L17.268 34C18.0378 35.3333 19.9623 35.3333 20.7321 34L22.4641 31L25 31C29.4183 31 33 27.4183 33 23V11C33 6.58172 29.4183 3 25 3H13Z"
        />
      </mask>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 3C8.58172 3 5 6.58172 5 11V23C5 27.4183 8.58172 31 13 31H15.5359L17.268 34C18.0378 35.3333 19.9623 35.3333 20.7321 34L22.4641 31L25 31C29.4183 31 33 27.4183 33 23V11C33 6.58172 29.4183 3 25 3H13Z"
        fill=${isTagging ? '#767676' : '#FEFEFE'}
      />
      <path
        d="M15.5359 31L16.4019 30.5L16.1133 30H15.5359V31ZM17.268 34L16.4019 34.5H16.4019L17.268 34ZM20.7321 34L21.5981 34.5L20.7321 34ZM22.4641 31V30H21.8868L21.5981 30.5L22.4641 31ZM25 31V30V31ZM6 11C6 7.13401 9.13401 4 13 4V2C8.02944 2 4 6.02944 4 11H6ZM6 23V11H4V23H6ZM13 30C9.13401 30 6 26.866 6 23H4C4 27.9706 8.02944 32 13 32V30ZM15.5359 30H13V32H15.5359V30ZM18.134 33.5L16.4019 30.5L14.6699 31.5L16.4019 34.5L18.134 33.5ZM19.866 33.5C19.4811 34.1667 18.5189 34.1667 18.134 33.5L16.4019 34.5C17.5566 36.5 20.4434 36.5 21.5981 34.5L19.866 33.5ZM21.5981 30.5L19.866 33.5L21.5981 34.5L23.3301 31.5L21.5981 30.5ZM25 30L22.4641 30V32L25 32V30ZM32 23C32 26.866 28.866 30 25 30V32C29.9706 32 34 27.9706 34 23H32ZM32 11V23H34V11H32ZM25 4C28.866 4 32 7.13401 32 11H34C34 6.02944 29.9706 2 25 2V4ZM13 4H25V2H13V4Z"
        fill="#CCCCCD"
        mask="url(#path-1-inside-1_156_9984)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_156_9984"
        x="0"
        y="0"
        width="38"
        height="42"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.462745 0 0 0 0 0.462745 0 0 0 0 0.47451 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_156_9984"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_156_9984"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</div>
`;

  return marker;
};
