module.exports = {
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper:{
    '@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)"
  ]
};
