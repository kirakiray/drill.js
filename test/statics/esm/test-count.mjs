export default function getName() {
  return "I am test-count";
}

if (!window.mCount) {
  window.mCount = 1;
} else {
  window.mCount += 1;
}
