/*
 * 仅覆盖横向底图（3308 × 1080）上的实际地点名牌，不覆盖建筑图形。
 * 坐标按名牌边界逐项校正；images 只记录用户已上传的实景照片。
 */
window.CAMPUS_LOCATIONS = [
  { id: 'outdoor-pool', name: '室外游泳池', x: 438, y: 18, width: 155, height: 40 },
  { id: 'talent-apartment', name: '人才公寓', x: 760, y: 50, width: 150, height: 43 },
  { id: 'yuqiu-center', name: '网羽中心', x: 582, y: 184, width: 152, height: 42, images: ['assets/locations/yuqiu-center-1.webp'] },
  { id: 'second-track-field', name: '第二田径运动场', x: 558, y: 292, width: 145, height: 82, images: ['assets/locations/second-track-field-1.webp'] },
  { id: 'ganlu-college', name: '甘露书院', x: 926, y: 306, width: 160, height: 46 },
  { id: 'east-gate', name: '东大门', x: 500, y: 500, width: 135, height: 42 },
  { id: 'keyuan', name: '可园', x: 1100, y: 56, width: 85, height: 38 },
  { id: 'keyuan-restaurant', name: '可园餐厅', x: 1390, y: 50, width: 130, height: 40, images: ['assets/locations/keyuan-restaurant-1.webp'] },
  { id: 'administration', name: '行政楼', x: 1120, y: 212, width: 120, height: 46, images: ['assets/locations/administration-1.webp'] },
  { id: 'boji-building', name: '博济楼（第一教学楼）', x: 1150, y: 358, width: 175, height: 60, images: ['assets/locations/boji-building-1.webp'] },
  { id: 'east-lake', name: '东湖', x: 1245, y: 292, width: 95, height: 38 },
  { id: 'sun-city', name: '太阳城', x: 1512, y: 55, width: 105, height: 43, images: ['assets/locations/sun-city-1.webp'] },
  { id: 'affairs-center', name: '事务中心', x: 1650, y: 54, width: 125, height: 45 },
  { id: 'hongyi-building', name: '弘医楼（思情信息中心）', x: 1490, y: 210, width: 160, height: 60 },
  { id: 'hongyi-square', name: '弘医广场', x: 1488, y: 438, width: 135, height: 45, images: ['assets/locations/hongyi-square-1.webp'] },
  { id: 'north-lake', name: '北湖', x: 1515, y: 505, width: 110, height: 38 },
  { id: 'deqi-building', name: '德启楼（第二教学楼）', x: 1918, y: 360, width: 155, height: 60 },
  { id: 'siyuan-building', name: '思源楼', x: 2048, y: 198, width: 100, height: 42, images: ['assets/locations/siyuan-building.webp'] },
  { id: 'heyuan', name: '和园', x: 2105, y: 60, width: 100, height: 42 },
  { id: 'west-lake', name: '西湖', x: 1960, y: 318, width: 135, height: 48 },
  { id: 'lianchi-college', name: '莲池书院', x: 2260, y: 300, width: 155, height: 43, images: ['assets/locations/lianchi-college-1.webp'] },
  { id: 'anatomy-center', name: '人体解剖学中心', x: 2260, y: 48, width: 170, height: 34, images: ['assets/locations/anatomy-center-1.webp'] },
  { id: 'medical-animal-center', name: '医学实验动物中心', x: 2465, y: 48, width: 175, height: 58 },
  { id: 'first-track-field', name: '第一田径运动场', x: 2700, y: 58, width: 150, height: 78, images: ['assets/locations/first-track-field-1.webp', 'assets/locations/first-track-field-2.webp'] },
  { id: 'graduate-apartment', name: '研究生公寓', x: 2940, y: 42, width: 150, height: 43, images: ['assets/locations/graduate-apartment-1.webp'] },
  { id: 'academic-exchange-center', name: '学术交流中心', x: 3075, y: 135, width: 180, height: 43, images: ['assets/locations/academic-exchange-center-1.webp'] },
  { id: 'science-building', name: '科技楼', x: 3028, y: 218, width: 95, height: 40, images: ['assets/locations/science-building-1.webp'] },
  { id: 'university-science-park', name: '大学科技园', x: 3085, y: 255, width: 180, height: 47 },
  { id: 'century-hall', name: '世纪礼堂', x: 2688, y: 347, width: 149, height: 38, images: ['assets/locations/century-hall-1.webp'] },
  { id: 'school-clinic', name: '校医院', x: 425, y: 820, width: 145, height: 72 },
  { id: 'yayuan-restaurant', name: '雅园餐厅', x: 980, y: 635, width: 145, height: 42, images: ['assets/locations/yayuan-restaurant-1.webp'] },
  { id: 'yayuan', name: '雅园', x: 910, y: 680, width: 115, height: 42, images: ['assets/locations/yayuan-1.webp'] },
  { id: 'linjiang-college', name: '临江书院', x: 1195, y: 775, width: 155, height: 45, images: ['assets/locations/linjiang-college-1.webp'] },
  { id: 'songlin-college', name: '松林书院', x: 1940, y: 775, width: 155, height: 45, images: ['assets/locations/songlin-college-1.webp'] },
  { id: 'ruiyuan-restaurant', name: '瑞园餐厅', x: 2205, y: 620, width: 150, height: 43, images: ['assets/locations/ruiyuan-restaurant-1.webp'] },
  { id: 'ruiyuan', name: '瑞园', x: 2205, y: 685, width: 115, height: 44 },
  { id: 'ruiyuan-basketball-court', name: '瑞园篮球场', x: 2300, y: 850, width: 245, height: 62, images: ['assets/locations/ruiyuan-basketball-court-1.webp'] },
  { id: 'botanical-garden', name: '药用植物园', x: 2670, y: 625, width: 145, height: 43 },
  { id: 'west-gate', name: '西大门', x: 3185, y: 405, width: 123, height: 45 },
  { id: 'north-gate', name: '北大门', x: 1480, y: 1005, width: 170, height: 60, images: ['assets/locations/north-gate-1.webp'] }
];

window.CAMPUS_COLLECTIONS = {
  dining: {
    name: '餐厅超市',
    images: Array.from({ length: 42 }, (_, index) => `assets/collections/dining/dining-${String(index + 1).padStart(2, '0')}.webp`)
  },
  residence: {
    name: '寝室',
    images: Array.from({ length: 7 }, (_, index) => `assets/collections/residence/residence-${String(index + 1).padStart(2, '0')}.webp`)
  }
};
