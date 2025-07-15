// Mock English to Urdu translation service
export class TranslationService {
  private dictionary: Record<string, string> = {
    // Common words
    'and': 'اور',
    'the': '',
    'of': 'کا',
    'to': 'کو',
    'in': 'میں',
    'for': 'کے لیے',
    'with': 'کے ساتھ',
    'on': 'پر',
    'at': 'میں',
    'by': 'کے ذریعے',
    'from': 'سے',
    'as': 'جیسے',
    'is': 'ہے',
    'are': 'ہیں',
    'was': 'تھا',
    'were': 'تھے',
    'have': 'ہے',
    'has': 'ہے',
    'had': 'تھا',
    'will': 'گا',
    'would': 'گا',
    'can': 'سکتا',
    'could': 'سکتا',
    'should': 'چاہیے',
    'must': 'لازمی',
    
    // Technology terms
    'web': 'ویب',
    'development': 'ڈیولپمنٹ',
    'technology': 'ٹیکنالوجی',
    'application': 'ایپلیکیشن',
    'software': 'سافٹ ویئر',
    'computer': 'کمپیوٹر',
    'internet': 'انٹرنیٹ',
    'website': 'ویب سائٹ',
    'digital': 'ڈیجیٹل',
    'online': 'آن لائن',
    'system': 'سسٹم',
    'platform': 'پلیٹ فارم',
    'framework': 'فریم ورک',
    'database': 'ڈیٹابیس',
    'server': 'سرور',
    'client': 'کلائنٹ',
    'programming': 'پروگرامنگ',
    'coding': 'کوڈنگ',
    'artificial': 'مصنوعی',
    'intelligence': 'ذہانت',
    'machine': 'مشین',
    'learning': 'سیکھنا',
    'data': 'ڈیٹا',
    'user': 'صارف',
    'interface': 'انٹرفیس',
    'experience': 'تجربہ',
    'design': 'ڈیزائن',
    'performance': 'کارکردگی',
    'security': 'سیکیورٹی',
    'mobile': 'موبائل',
    'responsive': 'جوابی',
    'interactive': 'انٹرایکٹو',
    'modern': 'جدید',
    'future': 'مستقبل',
    'innovation': 'اختراع',
    'solution': 'حل',
    'developer': 'ڈیولپر',
    'developers': 'ڈیولپرز',
    'creating': 'بنانا',
    'applications': 'ایپلیکیشنز',
    'technologies': 'ٹیکنالوجیز',
    'possibilities': 'امکانات',
    'opportunities': 'مواقع',
    'accessible': 'قابل رسائی',
    'reliable': 'قابل اعتماد',
    'seamless': 'ہموار',
    'consistent': 'مستحکم',
    'functionality': 'فعالیت',
    'boundaries': 'حدود',
    'innovative': 'جدید',
    'emerging': 'ابھرتی',
    'transformed': 'تبدیل',
    'dramatically': 'ڈرامائی طور پر',
    'constantly': 'مسلسل',
    'rapidly': 'تیزی سے',
    'continues': 'جاری رکھتا',
    'emphasizes': 'زور دیتا',
    'focusing': 'توجہ مرکوز',
    'ensuring': 'یقینی بنانا',
    'regardless': 'قطع نظر',
    'increased': 'بڑھا',
    'increasingly': 'بڑھتے ہوئے',
    'integral': 'لازمی',
    'exciting': 'دلچسپ',
    'promise': 'وعدہ',
    'worldwide': 'دنیا بھر میں',
    'bright': 'روشن',
    'push': 'آگے بڑھانا',
    'possible': 'ممکن'
  };

  async translateToUrdu(text: string): Promise<string> {
    // Simulate translation processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple word-by-word translation with dictionary
    const words = text.toLowerCase().split(/\s+/);
    const translatedWords: string[] = [];
    
    for (const word of words) {
      // Remove punctuation for dictionary lookup
      const cleanWord = word.replace(/[^\w]/g, '');
      const translation = this.dictionary[cleanWord];
      
      if (translation) {
        translatedWords.push(translation);
      } else {
        // Keep original word if no translation found
        translatedWords.push(word);
      }
    }
    
    // Mock a more natural Urdu translation
    const urduTranslation = `ویب ڈیولپمنٹ تیزی سے تبدیل ہو رہی ہے نئی ٹیکنالوجیز کے ساتھ۔ یہ فیلڈ سادہ ویب سائٹس سے پیچیدہ انٹرایکٹو ایپلیکیشنز تک تیار ہوا ہے۔

جدید ویب ڈیولپمنٹ کارکردگی، قابل رسائی، اور صارف کے تجربے کو ترجیح دیتی ہے۔ ڈیولپرز کراس پلیٹ فارم ایپلیکیشنز بنانے پر توجہ مرکوز کر رہے ہیں۔ مصنوعی ذہانت اور مشین لرننگ کی انضمام نے نئے امکانات کھولے ہیں۔

مستقبل میں، پروگریسو ویب ایپس، سرور ری آرکیٹیکچر، اور ایج کمپیوٹنگ میں مسلسل اختراع کی توقع کی جا سکتی ہے۔ یہ ویب ایپلیکیشنز کو تیز، قابل اعتماد اور عالمی طور پر قابل رسائی بنانے کا وعدہ کرتی ہے۔`;
    
    return urduTranslation;
  }
}

export const translationService = new TranslationService();