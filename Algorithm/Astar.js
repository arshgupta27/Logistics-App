class Node {
  constructor(state, parent, actions, heuristic, totalCost) {
    this.state = state;
    this.parent = parent;
    this.actions = actions;
    this.heuristic = heuristic;
    this.totalCost = totalCost;
  }
}

function findMin(frontier) {
  var minV = Math.pow(10, 1000);
  var node = '';
  for (var i in frontier) {
    if (minV > frontier[i][1]) {
      minV = frontier[i][1];
      node = i;
    }
  }
  return node;
}

function actionSequence(graph, goalState) {
  let solution = [goalState];
  let currentParent = graph[goalState].parent;
  while (currentParent != null) {
    solution.push(currentParent);
    currentParent = graph[currentParent].parent;
  }
  solution.reverse();
  return solution;
}

export const Astar = (source, destination) => {
  var initialState = source;
  var goalState = destination;

  var graph = {
    "Ambala": new Node(
      "Ambala",
      null,
      [
        ["Chandigarh", 45],
        ["Kurukshetra", 50],
        ["Panchkula", 47],
        ["Kaithal", 80],
        ["Yamunanagar", 60],
      ],
      [30.3782, 76.7800], 0
    ),
    "Bhiwani": new Node(
      "Bhiwani",
      null,
      [
        ["Rohtak", 50],
        ["Hisar", 64],
        ["Charkhi Dadri", 29],
      ],
      [28.8406, 76.1286], 0
    ),
    "Chandigarh": new Node(
      "Chandigarh",
      null,
      [
        ["Panchkula", 12],
        ["Ambala", 45],
      ],
      [28.8406, 76.1286], 0
    ),
    "Charkhi Dadri": new Node(
      "Charkhi Dadri",
      null,
      [
        ["Bhiwani", 29],
        ["Jhajjar", 43],
        ["Mahendragarh", 41]
      ],
      [28.5904, 76.2634], 0
    ),
    "Faridabad": new Node(
      "Faridabad",
      null,
      [
        ["Gurugram", 39],
        ["Palwal", 31],
        ["New Delhi", 28]
      ],
      [28.4024, 77.3167], 0
    ),
    "Fatehabad": new Node(
      "Fatehabad",
      null,
      [
        ["Hisar", 60],
        ["Jind", 100],
        ["Sirsa", 41]
      ],
      [29.5135, 72.6762], 0
    ),
    "Gurugram": new Node(
      "Gurugram",
      null,
      [
        ["Faridabad", 39],
        ["Nuh", 47],
        ["Jhajjar", 47],
        ["Rewari", 58],
        ["New Delhi", 30]
      ],
      [28.4595, 77.0266], 0
    ),
    "Hisar": new Node(
      "Hisar",
      null,
      [
        ["Fatehabad", 50],
        ["Bhiwani", 65],
        ["Jind", 71],
        ["Rohtak", 101]
      ],
      [29.1492, 75.7169], 0
    ),
    "Jhajjar": new Node(
      "Jhajjar",
      null,
      [
        ["Charkhi Dadri", 43],
        ["Rohtak", 39],
        ["Rewari", 53],
        ["New Delhi", 80],
        ["Gurugram", 47],
      ],
      [28.6097, 76.6842], 0
    ),
    "Jind": new Node(
      "Jind",
      null,
      [
        ["Rohtak", 69],
        ["Kaithal", 56],
        ["Hisar", 71],
        ["Panipat", 71],
        ["Sonipat", 84],
        ["Fatehabad", 100],
      ],
      [29.3157, 76.3388], 0
    ),
    "Kaithal": new Node(
      "Kaithal",
      null,
      [
        ["Jind", 56],
        ["Karnal", 62],
        ["Kurukshetra", 58],
        ["Ambala", 80],
      ],
      [29.8014, 76.3732], 0
    ),
    "Karnal": new Node(
      "Karnal",
      null,
      [
        ["Kaithal", 62],
        ["Panipat", 35],
        ["Yamunanagar", 64],
        ["Kurukshetra", 35],
      ],
      [29.6857, 76.9905], 0
    ),
    "Kurukshetra": new Node(
      "Kurukshetra",
      null,
      [
        ["Ambala", 30],
        ["Kaithal", 52],
        ["Karnal", 35],
        ["Yamunanagar", 45],
      ],
      [29.9695, 76.9798], 0
    ),
    "Mahendragarh": new Node(
      "Mahendragarh",
      null,
      [
        ["Charkhi Dadri", 40],
        ["Rewari", 56],
      ],
      [28.2828, 76.1499], 0
    ),
    "New Delhi": new Node(
      "New Delhi",
      null,
      [
        ["Sonipat", 60],
        ["Faridabad", 29],
        ["Gurugram", 30],
        ["Jhajjar", 80],
      ],
      [28.0910, 77.0179], 0
    ),
    "Nuh": new Node(
      "Nuh",
      null,
      [
        ["Palwal", 35],
        ["Gurugram", 47],
      ],
      [28.0910, 77.0179], 0
    ),
    "Palwal": new Node(
      "Palwal",
      null,
      [
        ["Faridabad", 31],
        ["Nuh", 35],
      ],
      [28.1487, 77.3544], 0
    ),
    "Panchkula": new Node(
      "Panchkula",
      null,
      [
        ["Ambala", 48],
        ["Chandigarh", 12],
      ],
      [30.6942, 76.8598], 0
    ),
    "Panipat": new Node(
      "Panipat",
      null,
      [
        ["Karnal", 36],
        ["Jind", 71],
        ["Sonipat", 52],
        ["Rohtak", 77],
      ],
      [29.3888, 76.9759], 0
    ),
    "Rewari": new Node(
      "Rewari",
      null,
      [
        ["Mahendragarh", 55],
        ["Jhajjar", 50],
        ["Gurugram", 58],
      ],
      [28.2078, 76.6185], 0
    ),
    "Rohtak": new Node(
      "Rohtak",
      null,
      [
        ["Bhiwani", 50],
        ["Hisar", 101],
        ["Jhajjar", 39],
        ["Jind", 69],
        ["Panipat", 77],
      ],
      [28.8955, 76.5890], 0
    ),
    "Sirsa": new Node(
      "Sirsa",
      null,
      [
        ["Fatehabad", 41],
      ],
      [29.5831, 75.0288], 0
    ),
    "Sonipat": new Node(
      "Sonipat",
      null,
      [
        ["Panipat", 52],
        ["Jind", 87],
        ["New Delhi", 62],
      ],
      [29.0588, 77.0126], 0
    ),
    "Yamunanagar": new Node(
      "Yamunanagar",
      null,
      [
        ["Kurukshetra", 60],
        ["Karnal", 60],
        ["Ambala", 60],
      ],
      [30.1290, 77.3570], 0
    ),
  };

  var frontier = new Object();
  var heuristicCost = Math.sqrt(Math.pow(graph[goalState].heuristic[0] - graph[initialState].heuristic[0], 2) + Math.pow(graph[goalState].heuristic[1] - graph[initialState].heuristic[1], 2));
  frontier[initialState] = [null, heuristicCost];
  var explored = new Object();

  while (Object.keys(frontier).length != 0) {
    var currentNode = findMin(frontier);
    delete frontier[currentNode];

    if (graph[currentNode].state == goalState) {
      return actionSequence(graph, goalState);
    }

    heuristicCost = Math.sqrt(Math.pow(graph[goalState].heuristic[0] - graph[currentNode].heuristic[0], 2) + Math.pow(graph[goalState].heuristic[1] - graph[currentNode].heuristic[1], 2));
    var currentCost = graph[currentNode].totalCost;
    explored[currentNode] = [graph[currentNode].parent, heuristicCost + currentCost];

    for (let i in graph[currentNode].actions) {
      var child = graph[currentNode].actions[i];
      currentCost = child[1] + graph[currentNode].totalCost;
      heuristicCost = Math.sqrt(Math.pow(graph[goalState].heuristic[0] - graph[child[0]].heuristic[0], 2) + Math.pow(graph[goalState].heuristic[1] - graph[child[0]].heuristic[1], 2));
      if (child[0] in explored) {
        if (graph[child[0]].parent == currentNode || child[0] == initialState || explored[child[0]][1] <= currentCost + heuristicCost) {
          continue;
        }
      }

      if (!(child[0] in frontier)) {
        graph[child[0]].parent = currentNode;
        graph[child[0]].totalCost = currentCost;
        frontier[child[0]] = [graph[child[0]].parent, currentCost + heuristicCost];
      }
      else {
        if (frontier[child[0]][1] < currentCost + heuristicCost) {
          graph[child[0]].parent = frontier[child[0]][0];
          graph[child[0]].totalCost = frontier[child[0]][1] - heuristicCost;
        }
        else {
          frontier[child[0]] = [currentNode, currentCost + heuristicCost];
          graph[child[0]].parent = frontier[child[0]][0];
          graph[child[0]].totalCost = currentCost;
        }
      }
    }
  }
}