interface Swipper {
  navigation: {
    init: () => void;
    update: () => void;
  };
  params: {
    navigation: {
      nextEl: string;
      prevEl: string;
    };
  };
}
