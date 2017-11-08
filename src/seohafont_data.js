import { unfold } from './vector.js';

const A = {
  vectors: [
    {
      x: 0,
      y: 1
    },
    {
      x: 0.5,
      y: -1
    },
    {
      x: 0.5,
      y: 1
    },
    {
      x: -0.75,
      y: -0.5
    }
  ]
};
const B = {
  vectors: [
    {
      x: 0,
      y: 0
    },
    {
      x: 1,
      y: 0.25
    },
    {
      x: -3 / 4,
      y: 0.25
    },
    {
      x: 3 / 4,
      y: 1 / 4
    },
    {
      x: -1,
      y: 0.25
    },
    {
      x: 0,
      y: -3 / 4
    }
  ]
};
const C = {
  vectors: [
    {
      x: 1,
      y: 0
    },
    {
      x: -1,
      y: 0.5
    },
    {
      x: 1,
      y: 0.5
    }
  ]
};
const D = {
  vectors: [
    {
      x: 0,
      y: 0
    },
    {
      x: 1,
      y: 0.25
    },
    {
      x: 0,
      y: 0.5
    },
    {
      x: -1,
      y: 1 / 4
    },
    {
      x: 0,
      y: -3 / 4
    }
  ]
};
const E = {
  vectors: [
    {
      x: 1,
      y: 0
    },
    {
      x: -1,
      y: 1 / 4
    },
    {
      x: 1,
      y: 9 / 16 - 1 / 4
    },
    {
      x: 0,
      y: -1 / 8
    },
    {
      x: -1,
      y: 3 / 4 - 7 / 16
    },
    {
      x: 1,
      y: 1 / 4
    }
  ]
};
const F = {
  vectors: [
    {
      x: 1,
      y: 0
    },
    {
      x: -1,
      y: 1 / 8
    },
    {
      x: 0,
      y: -1 / 8
    },
    {
      x: 1,
      y: 3 / 8
    },
    {
      x: 0,
      y: -1 / 8
    },
    {
      x: -1,
      y: 1 / 8
    },
    {
      x: 0,
      y: 5 / 8
    }
  ]
};
const G = {
  vectors: [
    {
      x: 1,
      y: 3 / 8
    },
    {
      x: -1 / 4,
      y: -3 / 8
    },
    {
      x: -1 / 2,
      y: 0
    },
    {
      x: -1 / 4,
      y: 3 / 8
    },
    {
      x: 0,
      y: 1 / 4
    },
    {
      x: 1 / 4,
      y: 3 / 8
    },
    {
      x: 1 / 2,
      y: 0
    },
    {
      x: 1 / 4,
      y: -3 / 8
    },
    {
      x: -1 / 2,
      y: -1 / 8
    }
  ]
};
const H = {
  vectors: [
    {
      x: 1 / 4,
      y: 5 / 8
    },
    {
      x: -1 / 4,
      y: 3 / 8
    },
    {
      x: 0,
      y: -1
    },
    {
      x: 1 / 4,
      y: 1 / 2
    },
    {
      x: 1 / 2,
      y: 0
    },
    {
      x: 1 / 4,
      y: 1 / 2
    },
    {
      x: 0,
      y: -1
    },
    {
      x: -1 / 4,
      y: 3 / 8
    }
  ]
};
/*
const H2 = {
  vectors: [
    {
      x: 0,
      y: 1
    },
    {
      x: 0,
      y: -1
    },
    {
      x: 1 / 4,
      y: 1 / 2
    },
    {
      x: 1 / 2,
      y: 0
    },
    {
      x: 1 / 4,
      y: 1 / 2
    },
    {
      x: 0,
      y: -1
    },
  ]
};
*/
const I = {
  vectors: [
    { x: 1 / 4, y: 0 },
    { x: 1 / 2, y: 0 },
    { x: -1 / 4, y: 1 / 8 },
    { x: 0, y: 3 / 4 },
    {
      x: -1 / 4,
      y: 1 / 8
    },
    { x: 1 / 2, y: 0 }
  ]
};
const J = {
  vectors: [
    { x: 1 / 4, y: 0 },
    { x: 1 / 2, y: 0 },
    { x: -1 / 4, y: 1 / 8 },
    { x: 0, y: 7 / 8 },
    { x: -1 / 4, y: -3 / 8 }
  ]
};
const K = {
  vectors: [
    { x: 0, y: 0 },
    { x: 0, y: 4 / 8 },
    { x: 1, y: -4 / 8 },
    { x: -3 / 4, y: 4 / 8 },
    { x: 3 / 4, y: 4 / 8 },
    {
      x: -7 / 8,
      y: -1 / 2
    },
    { x: -1 / 8, y: 1 / 2 }
  ]
};
const L = {
  vectors: [
    {
      x: 0,
      y: 0
    },
    {
      x: 1 / 4,
      y: 1
    },
    {
      x: -1 / 4,
      y: -1 / 8
    },
    {
      x: 1,
      y: 1 / 8
    }
  ]
};
const M = {
  vectors: [
    {
      x: 0,
      y: 1
    },
    {
      x: 1 / 4,
      y: -1
    },
    {
      x: 1 / 4,
      y: 3 / 4
    },
    {
      x: 1 / 4,
      y: -3 / 4
    },
    {
      x: 1 / 4,
      y: 1
    }
  ]
};
const N = {
  vectors: [
    {
      x: 0,
      y: 1
    },
    {
      x: 1 / 4,
      y: -1
    },
    {
      x: -1 / 4,
      y: 0
    },
    {
      x: 1,
      y: 1
    },
    {
      x: -1 / 4,
      y: 0
    },
    {
      x: 1 / 4,
      y: -1
    }
  ]
};
const O = {
  vectors: [
    {
      x: 1 / 2,
      y: 0
    },
    {
      x: 1 / 2,
      y: 1 / 8
    },
    {
      x: 0,
      y: 3 / 4
    },
    {
      x: -1 / 2,
      y: 1 / 8
    },
    {
      x: -1 / 2,
      y: -1 / 8
    },
    {
      x: 0,
      y: -3 / 4
    },
    {
      x: 1 / 2,
      y: -1 / 8
    }
  ]
};
//DONE
const P = {
  vectors: []
};
const Q = {
  vectors: []
};
const R = {
  vectors: []
};
const S = {
  vectors: [
    {
      x: 1,
      y: 1 / 4
    },
    {
      x: -1 / 4,
      y: -1 / 4
    },
    {
      x: -1 / 2,
      y: 0
    },
    {
      x: -1 / 4,
      y: 3 / 8
    },
    {
      x: 1 / 4,
      y: 1 / 4
    },
    {
      x: 0,
      y: -1 / 4
    },
    {
      x: 1 / 4,
      y: 1 / 4
    },
    {
      x: 0,
      y: -1 / 4
    },
    {
      x: 1 / 4,
      y: 1 / 4
    },
    {
      x: 0,
      y: -1 / 4
    },
    {
      x: 1 / 4,
      y: 1 / 4
    },
    {
      x: -1 / 4,
      y: 3 / 8
    },
    {
      x: -1 / 2,
      y: 0
    },
    {
      x: -1 / 4,
      y: -1 / 4
    }
  ]
}; //DONE
const T = {
  vectors: []
};
const U = {
  vectors: []
};
const V = {
  vectors: []
};
const W = {
  vectors: []
};
const Y = {
  vectors: []
};
const X = {
  vectors: []
};
const Z = {
  vectors: []
};
const shf_data = {
  A: A,
  B: B,
  C: C,
  D: D,
  E: E,
  F: F,
  G: G,
  H: H,
  I: I,
  J: J,
  K: K,
  L: L,
  M: M,
  N: N,
  O: O,
  P: P,
  Q: Q,
  R: R,
  S: S,
  T: T,
  U: U,
  V: V,
  W: W,
  X: X,
  Y: Y,
  Z: Z
};
export default shf_data;
