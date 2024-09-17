export const filterNewVariants = (data1, data2) => {
  let hasNewColor = false; // Biến kiểm tra xem có màu sắc mới hay không

  // Để giữ lại các màu sắc đã có từ data1, khởi tạo map với attribute_id là khóa
  const colorMap = new Map();
  data1.forEach((item) => {
    if (item.attribute_id === 1) {
      colorMap.set(item.attribute_id, new Set(item.value_ids));
    }
  });

  const newData = data2.reduce((acc, item2) => {
    if (item2.attribute_id === 1) {
      // Tìm phần tử màu sắc tương ứng trong data1
      const matchingColor = colorMap.get(item2.attribute_id);

      if (matchingColor) {
        // Lọc các value_id mới chưa có trong matchingColor
        const newColors = item2.value_ids.filter(
          (value_id) => !matchingColor.has(value_id)
        );

        if (newColors.length > 0) {
          hasNewColor = true;
          acc.push({
            attribute_id: item2.attribute_id,
            value_ids: newColors,
          });
        }
      } else {
        // Nếu không có màu trong data1, đánh dấu đã có màu mới và thêm toàn bộ value_ids
        hasNewColor = true;
        acc.push(item2);
      }
    } else {
      // Với các attribute khác (size, chất liệu, v.v.)
      if (hasNewColor) {
        // Nếu đã có màu mới, thêm toàn bộ giá trị của attribute_id khác
        acc.push(item2);
      } else {
        // Tìm phần tử tương ứng trong data1
        const matchingItem = data1.find(
          (item1) => item1.attribute_id === item2.attribute_id
        );

        if (matchingItem) {
          // Lọc các value_id mới chưa có trong matchingItem
          const newValues = item2.value_ids.filter(
            (value_id) => !matchingItem.value_ids.includes(value_id)
          );

          if (newValues.length > 0) {
            acc.push({
              attribute_id: item2.attribute_id,
              value_ids: newValues,
            });
          }
        } else {
          // Nếu attribute chưa tồn tại trong data1, thêm toàn bộ value_ids
          acc.push(item2);
        }
      }
    }
    return acc;
  }, []);

  return newData;
};
