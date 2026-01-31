// src/app/shared/components/footer/footer.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  categories = [
    { name: 'Programming & Tech', link: '/categories/1' },
    { name: 'Graphics & Design', link: '/categories/2' },
    { name: 'Digital Marketing', link: '/categories/3' },
    { name: 'Writing & Translation', link: '/categories/4' },
  ];

  about = [
    { name: 'Về chúng tôi', link: '/about' },
    { name: 'Điều khoản dịch vụ', link: '/terms' },
    { name: 'Chính sách bảo mật', link: '/privacy' },
    { name: 'Liên hệ', link: '/contact' },
  ];

  support = [
    { name: 'Trung tâm trợ giúp', link: '/help' },
    { name: 'Câu hỏi thường gặp', link: '/faq' },
    { name: 'Báo cáo sự cố', link: '/report' },
  ];
}
