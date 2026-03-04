// 性能优化工具

// 使用文档片段减少DOM重排
export function createFragment() {
  return document.createDocumentFragment();
}

// 批量添加元素
export function appendElements(parent, elements) {
  const fragment = createFragment();
  elements.forEach(element => {
    fragment.appendChild(element);
  });
  parent.appendChild(fragment);
}

// 防抖函数
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流函数
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 延迟加载函数
export function lazyLoad(callback, delay = 100) {
  if (typeof window !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    return observer;
  }
  return null;
}

// 缓存DOM元素
export function cacheDOM(selectors) {
  const cache = {};
  Object.entries(selectors).forEach(([key, selector]) => {
    cache[key] = document.querySelector(selector);
  });
  return cache;
}

// 批量更新DOM
export function batchUpdate(callback) {
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(callback);
  } else {
    setTimeout(callback, 0);
  }
}

// 优化事件委托
export function delegateEvent(parent, selector, eventType, handler) {
  parent.addEventListener(eventType, function(e) {
    const target = e.target.closest(selector);
    if (target) {
      handler.call(target, e);
    }
  });
}

// 计算函数执行时间
export function measureTime(func, name) {
  const start = performance.now();
  const result = func();
  const end = performance.now();
  console.log(`${name} took ${end - start}ms`);
  return result;
}

// 预加载资源
export function preloadResources(resources) {
  resources.forEach(resource => {
    if (resource.type === 'image') {
      const img = new Image();
      img.src = resource.url;
    } else if (resource.type === 'script') {
      const script = document.createElement('script');
      script.src = resource.url;
      script.defer = true;
      document.head.appendChild(script);
    } else if (resource.type === 'style') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = resource.url;
      document.head.appendChild(link);
    }
  });
}

// 检查浏览器支持的特性
export function checkSupport(feature) {
  const features = {
    intersectionObserver: 'IntersectionObserver' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window,
    performance: 'performance' in window,
    localStorage: 'localStorage' in window,
    sessionStorage: 'sessionStorage' in window
  };
  return features[feature] || false;
}

// 优化localStorage操作
export function safeLocalStorage(key, value = null) {
  try {
    if (value === null) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
  } catch (error) {
    console.error('LocalStorage error:', error);
    return false;
  }
}

// 内存使用监控
export function monitorMemory() {
  if (typeof performance !== 'undefined' && performance.memory) {
    const memory = performance.memory;
    console.log('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
    });
  }
}

// 网络状态监控
export function monitorNetwork() {
  if (typeof navigator !== 'undefined' && navigator.connection) {
    const connection = navigator.connection;
    console.log('Network status:', {
      type: connection.type,
      downlink: connection.downlink + 'Mbps',
      effectiveType: connection.effectiveType,
      rtt: connection.rtt + 'ms'
    });
  }
}

// 页面加载性能监控
export function monitorPageLoad() {
  if (typeof performance !== 'undefined' && performance.timing) {
    const timing = performance.timing;
    const metrics = {
      loadTime: timing.loadEventEnd - timing.navigationStart,
      domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
    };
    console.log('Page load metrics:', metrics);
    return metrics;
  }
  return null;
}

// 代码分割建议
export function suggestCodeSplitting() {
  // 分析代码大小和使用频率
  // 这里可以根据实际项目情况提供代码分割建议
  console.log('Code splitting suggestions:');
  console.log('1. Split large modules into smaller ones');
  console.log('2. Use dynamic imports for rarely used features');
  console.log('3. Lazy load components that are not immediately visible');
}

// 资源压缩建议
export function suggestResourceOptimization() {
  console.log('Resource optimization suggestions:');
  console.log('1. Minify and compress CSS/JS files');
  console.log('2. Optimize images (compress, resize, use modern formats)');
  console.log('3. Use CDN for common libraries');
  console.log('4. Enable browser caching');
  console.log('5. Use HTTP/2 or HTTP/3');
}