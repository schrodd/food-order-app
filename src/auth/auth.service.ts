import { Injectable } from '@nestjs/common';
import { CommercesService } from '../commerces/commerces.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCommerceDto } from 'src/commerces/dto/commerce.dto';

@Injectable()
export class AuthService {
  constructor(
    private commercesService: CommercesService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.commercesService.getCommerceByUser(username);
    if (user && user.password === pass) {
      const { password, ...result }: any = user;
      return result._doc;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.user, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(newCommerce: CreateCommerceDto) {
    return this.commercesService.createCommerce(newCommerce);
  }
}
